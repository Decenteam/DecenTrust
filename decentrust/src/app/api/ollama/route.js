import { NextResponse } from 'next/server';
import ollama from 'ollama';

export async function POST(request) {
  try {
    const { message, history, model = 'llama3.2', options = {} } = await request.json();
    
    // 準備messages格式，包含歷史記錄
    const messages = history.map(msg => ({
      role: msg.isUser ? 'user' : 'assistant',
      content: msg.text
    }));
    
    // 添加新消息
    messages.push({
      role: 'user',
      content: message
    });
    
    // 準備API請求選項
    const apiOptions = {
      model: model,
      messages: messages,
    };
    
    // 添加可選參數
    if (options.temperature) {
      apiOptions.options = {
        temperature: options.temperature
      };
    }
    
    // 記錄請求
    console.log('發送到Ollama的請求:', {
      model,
      messageCount: messages.length,
    });
    
    // 請求Ollama API
    const response = await ollama.chat(apiOptions);
    
    return NextResponse.json({ 
      message: response.message.content,
      success: true,
      model: model,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Ollama API 錯誤:', error);
    
    // 返回更詳細的錯誤信息
    return NextResponse.json(
      { 
        error: '無法從AI獲取回應', 
        details: error.message,
        success: false 
      },
      { status: 500 }
    );
  }
}

// 獲取可用模型
export async function GET() {
  try {
    const models = await ollama.list();
    return NextResponse.json({ 
      models: models.models,
      success: true 
    });
  } catch (error) {
    console.error('獲取Ollama模型列表錯誤:', error);
    return NextResponse.json(
      { error: '無法獲取模型列表', success: false },
      { status: 500 }
    );
  }
}