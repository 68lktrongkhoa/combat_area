import { GoogleGenAI } from "@google/genai";
import { ROBOT_API_DOCS_EN, ROBOT_API_DOCS_VI } from '../constants';

const API_KEY = 'AIzaSyDyOuoCHVg_3j92Eqlsw75pTRzUbt0ByLI';

if (!API_KEY) {
  console.error("API_KEY is not set. Please check your environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const getSystemPrompt = (lang: 'en' | 'vi', userRequest: string) => {
    const apiDocs = lang === 'vi' ? ROBOT_API_DOCS_VI : ROBOT_API_DOCS_EN;

    if (lang === 'vi') {
        return `Bạn là một trợ lý lập trình chuyên nghiệp cho một game chiến đấu robot tên là "Code Combat Arena".
Nhiệm vụ của bạn là dịch chiến thuật cấp cao của người dùng, được viết bằng ngôn ngữ tự nhiên, thành mã JavaScript có thể hoạt động bằng cách sử dụng API Robot được cung cấp.
Mã bạn tạo ra sẽ được đặt bên trong hàm \`update()\` được gọi mỗi tick trong game.

**Tài liệu API Robot:**
${apiDocs}

**Yêu cầu Chiến thuật của Người dùng:**
"${userRequest}"

**Hướng dẫn:**
1.  Đọc kỹ yêu cầu của người dùng.
2.  Viết mã JavaScript sạch, hiệu quả để thực hiện chiến thuật, CHỈ sử dụng các hàm có sẵn trong tài liệu API.
3.  Thêm chú thích để giải thích logic.
4.  Không tự tạo ra các hàm API mới.
5.  Nếu yêu cầu không rõ ràng, hãy đưa ra một giả định hợp lý và ghi chú lại trong phần bình luận.
6.  Đầu ra cuối cùng CHỈ nên là mã JavaScript, không có bất kỳ văn bản, giải thích hay định dạng markdown nào xung quanh.

**Mã JavaScript được tạo:**
`;
    }

    return `You are a professional programming assistant for a robot combat game called "Code Combat Arena".
Your task is to translate a user's high-level strategy, written in natural language, into functional JavaScript code using the provided Robot API.
The code you generate will be placed inside an \`update()\` function that is called every game tick.

**Robot API Documentation:**
${apiDocs}

**User's Tactic Request:**
"${userRequest}"

**Instructions:**
1.  Read the user's request carefully.
2.  Write clean, efficient JavaScript to execute the tactic, ONLY using functions available in the API documentation.
3.  Add comments to explain the logic.
4.  Do not invent new API functions.
5.  If the request is ambiguous, make a reasonable assumption and note it in the comments.
6.  The final output should ONLY be the JavaScript code, without any surrounding text, explanations, or markdown formatting.

**Generated JavaScript Code:**
`;
};


export async function generateCodeFromPrompt(userRequest: string, lang: 'en' | 'vi', onRetry?: (attempt: number) => void): Promise<string> {
  if (!API_KEY) {
    throw new Error("Configuration Error: API_KEY is not set. Please check your environment variables.");
  }

  const model = 'gemini-2.5-flash';
  const fullPrompt = getSystemPrompt(lang, userRequest);

  const MAX_RETRIES = 5; // Increased from 4 to 5
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: fullPrompt,
      });
      return response.text.trim();
    } catch (error) {
      console.error(`Error calling Gemini API (Attempt ${attempt}):`, error);
      lastError = error as Error;
      const errorMessage = (lastError as any)?.message || '';

      if ((errorMessage.includes('RESOURCE_EXHAUSTED') || errorMessage.includes('429')) && attempt < MAX_RETRIES) {
        // Increased base delay with jitter
        const delay = 2000 * Math.pow(2, attempt) + Math.random() * 1000;
        if (onRetry) {
          onRetry(attempt);
        }
        await new Promise(res => setTimeout(res, delay));
        continue; 
      }
      break;
    }
  }

  const finalErrorMessage = lastError instanceof Error ? lastError.message : String(lastError);
  if (finalErrorMessage.includes('RESOURCE_EXHAUSTED') || finalErrorMessage.includes('429')) {
    const errorMsg = lang === 'vi' 
      ? "Bạn đã vượt quá hạn ngạch API. Chúng tôi đã thử lại nhiều lần nhưng không thành công. Vui lòng đợi một lúc rồi thử lại."
      : "You have exceeded your API quota. We tried several times without success. Please wait a while and try again.";
    throw new Error(errorMsg);
  }

  const errorMsg = lang === 'vi'
    ? `Đã xảy ra lỗi khi gọi Gemini API: ${finalErrorMessage}`
    : `An error occurred while calling the Gemini API: ${finalErrorMessage}`;
  throw new Error(errorMsg);
}