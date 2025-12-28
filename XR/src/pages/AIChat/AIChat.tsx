import { useState, useRef, useEffect } from 'react';
import { PageLayout } from '@/components/layouts/PageLayout';
import { Input, Button, Card, Typography, Space, Avatar, Spin } from 'antd';
import { SendOutlined, RobotOutlined, UserOutlined } from '@ant-design/icons';
import './AIChat.css';

const { TextArea } = Input;
const { Text, Title } = Typography;

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  'What is the significance of the Dong Son Drum in Vietnamese culture?',
  'Tell me about the history of the Dong Son Drum.',
  'What do the patterns on the Dong Son Drum mean?',
  'What was the purpose of the Dong Son Drum?',
  'What types of Dong Son Drums are there?',
  'Where have Dong Son Drums been found?',
];

const FAKE_RESPONSES: Record<string, string> = {
  'dong son drum': `The Dong Son Drum is one of the most important cultural symbols of Vietnam, dating back about 2,500 years. Made of bronze, it has a round shape with a flat top and a cylindrical body.

The drums are not only musical instruments but also symbols of power, faith, and ancient Vietnamese cultural identity. The patterns on the drum face depict aspects of daily life, spiritual beliefs, and rituals.

Dong Son Drums have been found in many places in Vietnam and across Southeast Asia, showing the widespread influence of Dong Son culture.`,
  history: `The history of the Dong Son Drum begins around the 7th–6th centuries BCE, during the Dong Son culture—a flourishing Bronze Age culture in northern Vietnam.

The Dong Son culture lasted from approximately 1000 BCE to the 1st–2nd centuries CE. During this era, ancient Vietnamese people mastered bronze casting techniques, creating beautiful drums with diverse and meaningful motifs.

Dong Son Drums were used in religious rituals, festivals, and possibly in warfare as signals. Today, the Dong Son Drum remains a vital cultural symbol for the Vietnamese people.`,
  pattern: `The patterns on the Dong Son Drum are diverse and carry deep meanings:

1. **Central Star**: Typically with 8-14 points, symbolizing the sun, life source, and power.

2. **Human Figures**: Depicting activities such as dancing, drumming, or rowing, reflecting a rich cultural life.

3. **Animals**: Such as birds, deer, or fish, indicating humanity's relationship with nature.

4. **Boats**: Representing trade, migration, and possibly funerary rituals.

5. **Geometric Shapes**: Spirals, lines, and other shapes add aesthetic value and may have spiritual meanings.

Each pattern reflects the thoughts, beliefs, and lifestyle of ancient Vietnamese people.`,
  purpose: `The Dong Son Drum had many uses:

**1. Religious rituals**: Used in ceremonies for worship, for rain, or to bless crops.

**2. Festivals**: Creating solemn, sacred sounds during traditional celebrations.

**3. Symbol of power**: A precious item displaying social status and authority.

**4. Musical instrument**: Used in performances, rituals, and gatherings.

**5. Warfare**: Some studies suggest they were used to command troops.

Today, Dong Son Drums are still featured in cultural festivals and remain a symbol of Vietnamese heritage.`,
  type: `There are several types of Dong Son Drums, classified by size, decoration, and era:

**1. By size**:
- Large drums: Diameter over 60cm
- Medium drums: 40-60cm
- Small drums: Less than 40cm

**2. By motifs**:
- Drums with eight-pointed star
- Drums with 10–14-pointed star
- Drums with many human and animal figures
- Drums with simple patterns

**3. By period**:
- Early drums (7th–5th centuries BCE)
- Middle drums (4th–2nd centuries BCE)
- Late drums (1st century BCE – 2nd century CE)

Each type reflects the development of bronze-casting technology and cultural evolution over time.`,
  found: `Dong Son Drums have been found at many locations:

**In Vietnam**:
- Dong Son Village (Thanh Hoa) – the first discovery site
- Northern provinces: Hanoi, Hai Phong, Hung Yen, Nam Dinh
- Central provinces: Quang Binh, Quang Tri
- Some places in southern Vietnam

**In other countries**:
- China (Yunnan, Guangxi)
- Laos
- Thailand
- Cambodia
- Malaysia
- Indonesia

Their widespread distribution shows the great impact of Dong Son culture in Southeast Asia. The Dong Son Drum is a heritage not only of Vietnam but of the entire region.`,
};

function getAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  // Find appropriate keyword
  for (const [keyword, response] of Object.entries(FAKE_RESPONSES)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }

  // Default response
  return `Thank you for your question about "${userMessage}". I am an AI assistant specializing in Vietnamese culture and history, especially the Dong Son Drum.

You can ask me about:
- The history and meaning of the Dong Son Drum
- The motifs and symbols on the Drum
- Usage and purpose of the Drum
- Types of Dong Son Drums
- Places where Dong Son Drums have been found

Try one of the suggested questions below or ask your own!`;
}

export function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        "Hello! I am the museum's AI assistant. I can help you learn about the Dong Son Drum and other Vietnamese cultural artifacts. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    // Simulate AI typing delay
    setTimeout(
      () => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: getAIResponse(inputValue.trim()),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000,
    );
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <PageLayout>
      <div className="ai-chat-container max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col p-4">
        <Card className="flex-1 flex flex-col overflow-hidden shadow-lg">
          <div className="mb-4 pb-4 border-b">
            <Space>
              <Avatar
                size="large"
                icon={<RobotOutlined />}
                className="bg-blue-500"
              />
              <div>
                <Title level={4} className="!mb-0">
                  Museum AI Assistant
                </Title>
                <Text type="secondary" className="text-sm">
                  Specialized in Vietnamese culture and history
                </Text>
              </div>
            </Space>
          </div>

          {/* Messages Area */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <Avatar
                    icon={<RobotOutlined />}
                    className="bg-blue-500 flex-shrink-0"
                  />
                )}
                <div
                  className={`max-w-[75%] rounded-lg p-4 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <Text
                    className={
                      message.role === 'user' ? 'text-white' : 'text-gray-800'
                    }
                  >
                    {message.content}
                  </Text>
                </div>
                {message.role === 'user' && (
                  <Avatar
                    icon={<UserOutlined />}
                    className="bg-gray-400 flex-shrink-0"
                  />
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar
                  icon={<RobotOutlined />}
                  className="bg-blue-500 flex-shrink-0"
                />
                <div className="bg-gray-100 rounded-lg p-4">
                  <Spin size="small" />
                  <Text type="secondary" className="ml-2">
                    Typing...
                  </Text>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="mb-4">
              <Text type="secondary" className="text-sm mb-2 block">
                Suggested questions:
              </Text>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((question, index) => (
                  <Button
                    key={index}
                    type="dashed"
                    size="small"
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="flex gap-2 pt-4 border-t">
            <TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your question..."
              autoSize={{ minRows: 1, maxRows: 4 }}
              className="flex-1"
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="h-auto"
            >
              Send
            </Button>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
