/**
 * 会話バブルコンポーネント
 */

interface ConversationBubbleProps {
  message: string;
  isUser: boolean;
  userName?: string;
}

export default function ConversationBubble({
  message,
  isUser,
  userName = "あなた",
}: ConversationBubbleProps) {
  if (isUser) {
    return (
      <div>
        <div className="flex flex-row-reverse">
          <div className="text-xl lg:text-3xl text-right mx-2 px-4 py-1 bg-blue-500 text-white rounded-2xl border-2 border-gray-300">
            {userName}
          </div>
        </div>
        <div className="flex flex-row-reverse ">
          <div className="relative w-2/3  bg-blue-500 p-4 rounded-2xl border-r-4 border-b-4 mt-1 border-gray-400">
            <div className="absolute -bottom-0.5 right-11 -mr-3 -mb-3 w-6 h-6 bg-blue-500 transform rotate-45 border-r-2 border-b-2 border-gray-400"></div>
            <div className="absolute bottom-0 right-11 -mr-3 -mb-3 w-6 h-6 bg-blue-500 transform rotate-45 -z-10"></div>
            <p
              className={`text-2xl lg:text-3xl text-left text-white ${
                message.length > 20 ? "text-xl" : "mx-2"
              } `}
            >
              {message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex">
        <div className="text-xl lg:text-3xl text-left mx-2 px-4 py-1 bg-white rounded-2xl border-2 border-gray-300">
          字飛茶
        </div>
      </div>
      <div className="flex">
        <div className="relative w-2/3  bg-white p-4 rounded-2xl shadow-xl border-l-4 border-b-4 mt-1 border-gray-400">
          <div className="absolute -bottom-0.5 left-11 -mr-3 -mb-3 w-6 h-6 bg-white transform rotate-45 border-r-2 border-b-2 border-gray-400"></div>
          <div className="absolute bottom-0 left-11 -mr-3 -mb-3 w-6 h-6 bg-white transform rotate-45 shadow-xl -z-10"></div>
          <p
            className={`text-gray-800 text-xl lg:text-3xl text-left ${
              message.length > 20 ? "text-2xl" : "mx-2"
            } `}
          >
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
