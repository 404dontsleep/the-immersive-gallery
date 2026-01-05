import { useState, useRef, useEffect, useMemo } from 'react';
import { PageLayout } from '@/components/layouts/PageLayout';
import { Input, Button, Card, Typography, Avatar, Spin, Tooltip } from 'antd';
import {
  SendOutlined,
  RobotOutlined,
  UserOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import { ChatbotService } from '@/services/chatbot.service';
import { useLanguageStore } from '@/stores/language.store';

const { TextArea } = Input;
const { Text, Title } = Typography;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

function formatTime(date: Date) {
  return (
    date.getHours().toString().padStart(2, '0') +
    ':' +
    date.getMinutes().toString().padStart(2, '0')
  );
}

const chatbotService = new ChatbotService();

export function AIChatPage() {
  const { language, getLanguage } = useLanguageStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const welcomeMessage = {
    id: '1',
    role: 'assistant',
    content: getLanguage('AI_CHAT_WELCOME'),
    timestamp: new Date(),
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChatbotResponse = (id: string, chunk: string) => {
    setMessages((prev) => {
      const existing = prev.find((msg) => msg.id === id);

      if (existing) {
        return prev.map((msg) =>
          msg.id === id
            ? {
                ...msg,
                content: msg.content + chunk,
              }
            : msg,
        );
      }

      return [
        ...prev,
        {
          id,
          role: 'assistant',
          content: chunk,
          timestamp: new Date(),
        },
      ];
    });
    setIsTyping(false);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    chatbotService.prompt(
      Math.random().toString(),
      language,
      userMessage.content,
      handleChatbotResponse,
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Color theme
  const userBg = 'linear-gradient(135deg, #00B4D8 0%, #48CAE4 100%)';
  const aiBg = 'linear-gradient(135deg, #F1F5F9 0%, #E9ECEF 100%)';

  return (
    <PageLayout>
      <div className="ai-chat-page flex flex-col h-full items-center px-2 py-6 bg-museum">
        <Card
          className="w-full max-w-5xl flex flex-col rounded-2xl shadow-[0_6px_32px_0_rgba(0,112,243,0.1)] border-0 bg-white h-full"
          styles={{
            body: {
              display: 'flex',
              flexDirection: 'column',
              minHeight: 600,
              padding: 0,
              height: '100%',
            },
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 px-8 py-6 border-b bg-white/80 sticky top-0 z-10">
            <Avatar
              size={56}
              icon={<RobotOutlined />}
              className="bg-gradient-to-tr from-blue-400 to-blue-700 shadow-sm"
            />
            <div>
              <Title level={3} className="!mb-0">
                {getLanguage('AI_CHAT_TITLE')}
              </Title>
              <Text type="secondary" className="text-base">
                {getLanguage('AI_CHAT_DESCRIPTION')}
                <Tooltip title={getLanguage('AI_CHAT_TOOLTIP')}>
                  <QuestionCircleOutlined className="ml-1 text-blue-500" />
                </Tooltip>
              </Text>
            </div>
          </div>
          {/* Chat Area */}
          <div
            className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-6 bg-transparent"
            style={{ scrollbarWidth: 'thin' }}
          >
            {[welcomeMessage, ...messages].map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end`}
              >
                {msg.role === 'assistant' && (
                  <Avatar
                    icon={<RobotOutlined />}
                    className="bg-gradient-to-tr from-blue-300 to-blue-600 shadow"
                    size={40}
                  />
                )}
                <div
                  className={`relative group max-w-[75%] px-5 py-4 rounded-2xl shadow ${
                    msg.role === 'user' ? '' : 'rounded-tl-md'
                  }`}
                  style={{
                    marginLeft: msg.role === 'assistant' ? 12 : 0,
                    marginRight: msg.role === 'user' ? 12 : 0,
                    background: msg.role === 'user' ? userBg : aiBg,
                    color: msg.role === 'user' ? '#fff' : '#2E4053',
                    borderTopRightRadius: msg.role === 'user' ? 8 : 24,
                    borderTopLeftRadius: msg.role === 'assistant' ? 8 : 24,
                  }}
                >
                  <Text
                    className={`break-words whitespace-pre-line text-base`}
                    style={{
                      color: msg.role === 'user' ? 'white' : '#2E4053',
                    }}
                  >
                    {msg.content}
                  </Text>
                  <span
                    className={`absolute text-xs text-gray-400 bottom-1 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                  >
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                {msg.role === 'user' && (
                  <Avatar
                    icon={<UserOutlined />}
                    className="bg-gradient-to-br from-gray-400 to-gray-500 shadow"
                    size={40}
                  />
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-end gap-2 justify-start animate-pulse">
                <Avatar
                  icon={<RobotOutlined />}
                  className="bg-gradient-to-tr from-blue-300 to-blue-600 shadow"
                  size={40}
                />
                <div className="bg-[#f0f4f8] px-5 py-4 rounded-2xl rounded-tl-md shadow max-w-[75%] flex items-center min-h-[40px]">
                  <Spin size="small" />
                  <Text type="secondary" className="ml-2">
                    {getLanguage('AI_CHAT_TYPING')}
                  </Text>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
          {/* Input */}
          <div className="flex items-end gap-3 px-6 py-5 border-t z-10">
            <TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={getLanguage('AI_CHAT_PLACEHOLDER')}
              autoSize={{ minRows: 1, maxRows: 4 }}
              className="flex-1 rounded-xl shadow-none border border-[#e3eaf2] outline-none focus:border-blue-400 text-base"
              style={{ background: 'white' }}
              maxLength={400}
              disabled={isTyping}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="rounded-full h-10 w-10 flex items-center justify-center text-lg shadow-yellow-400/20"
              style={{
                background: 'linear-gradient(90deg, #31C6F7 0%, #3099FD 100%)',
                border: 'none',
              }}
              tabIndex={-1}
            />
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
