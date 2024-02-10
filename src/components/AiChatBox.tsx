import React, { useEffect, useRef } from 'react'
import { useChat } from "ai/react"
import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Message } from 'ai';
import { useUser } from '@clerk/nextjs';
import { MagicWandIcon, TrashIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

interface AiChatBoxProps {
  open: boolean,
  OnClose: () => void;
}



export default function AiChatBox({ open, OnClose }: AiChatBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading, error } = useChat();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open])

  const lastMessageIsUser = messages[messages.length - 1]?.role === "user"

  return (
    <div className={cn("z-10 w-full max-w-[500px] max-h-[32rem]  p-1 xl-right-36", open ? "fixed bottom-0 right-0 " : "hidden")}>

      <div className='shadow-xl flex flex-col gap-4 h-[450px] md:h-[480px] border-[1.2px] rounded-xl bg-white dark:bg-[#202020] border-black '>
        <div className='border-b bg-primary text-white dark:text-black border-black rounded-t-xl h-[4rem] flex gap-1 items-center justify-center px-2'>
          Chat with <span className='font-bold'>NotesAI</span>
        </div>
        <div className="h-full overflow-y-auto p-4" ref={scrollRef}>
          {messages.map((item, index) => {
            return (
              <>
                <ChatMessages message={item} key={item.id} />
              </>
            )
          })}

          {
            isLoading && lastMessageIsUser && (
              <ChatMessages
                message={{
                  role: "assistant",
                  content: "Tinkering🤔..."
                }}
              />
            )
          }

          {
            error && (
              <ChatMessages
                message={{
                  role: "assistant",
                  content: "Something went wrong , try again..."
                }}
              />
            )
          }

          {
            !error && messages.length === 0 && (
              <div className='flex gap-4 flex-col items-center justify-center h-full'>
                <svg width="40" height="40" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.9 0.499976C13.9 0.279062 13.7209 0.0999756 13.5 0.0999756C13.2791 0.0999756 13.1 0.279062 13.1 0.499976V1.09998H12.5C12.2791 1.09998 12.1 1.27906 12.1 1.49998C12.1 1.72089 12.2791 1.89998 12.5 1.89998H13.1V2.49998C13.1 2.72089 13.2791 2.89998 13.5 2.89998C13.7209 2.89998 13.9 2.72089 13.9 2.49998V1.89998H14.5C14.7209 1.89998 14.9 1.72089 14.9 1.49998C14.9 1.27906 14.7209 1.09998 14.5 1.09998H13.9V0.499976ZM11.8536 3.14642C12.0488 3.34168 12.0488 3.65826 11.8536 3.85353L10.8536 4.85353C10.6583 5.04879 10.3417 5.04879 10.1465 4.85353C9.9512 4.65827 9.9512 4.34169 10.1465 4.14642L11.1464 3.14643C11.3417 2.95116 11.6583 2.95116 11.8536 3.14642ZM9.85357 5.14642C10.0488 5.34168 10.0488 5.65827 9.85357 5.85353L2.85355 12.8535C2.65829 13.0488 2.34171 13.0488 2.14645 12.8535C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L9.14646 5.14642C9.34172 4.95116 9.65831 4.95116 9.85357 5.14642ZM13.5 5.09998C13.7209 5.09998 13.9 5.27906 13.9 5.49998V6.09998H14.5C14.7209 6.09998 14.9 6.27906 14.9 6.49998C14.9 6.72089 14.7209 6.89998 14.5 6.89998H13.9V7.49998C13.9 7.72089 13.7209 7.89998 13.5 7.89998C13.2791 7.89998 13.1 7.72089 13.1 7.49998V6.89998H12.5C12.2791 6.89998 12.1 6.72089 12.1 6.49998C12.1 6.27906 12.2791 6.09998 12.5 6.09998H13.1V5.49998C13.1 5.27906 13.2791 5.09998 13.5 5.09998ZM8.90002 0.499976C8.90002 0.279062 8.72093 0.0999756 8.50002 0.0999756C8.2791 0.0999756 8.10002 0.279062 8.10002 0.499976V1.09998H7.50002C7.2791 1.09998 7.10002 1.27906 7.10002 1.49998C7.10002 1.72089 7.2791 1.89998 7.50002 1.89998H8.10002V2.49998C8.10002 2.72089 8.2791 2.89998 8.50002 2.89998C8.72093 2.89998 8.90002 2.72089 8.90002 2.49998V1.89998H9.50002C9.72093 1.89998 9.90002 1.72089 9.90002 1.49998C9.90002 1.27906 9.72093 1.09998 9.50002 1.09998H8.90002V0.499976Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                </svg>
                <p className='w-[20rem] text-center'>Ask and get answers related to your <span className='italic'>notes</span> or somthing comes in your <span className='italic'>mind</span></p>
              </div>
            )
          }
        </div>

        <form className='flex flex-col md:flex-row gap-2 p-4' onSubmit={handleSubmit}>
          <Input
            onChange={handleInputChange}
            value={input}
            ref={inputRef}
            placeholder='Say Something...'
          />
          <Button type='submit'>Send</Button>
          <Button className='w-full md:w-fit p-4' title='Clear Chat History' variant={"outline"} size={"icon"} onClick={() => setMessages([])}><TrashIcon /></Button>
        </form>
      </div>
    </div>
  )
}

function ChatMessages({ message: { role, content } }: { message: Pick<Message, "role" | "content"> }) {
  const { user } = useUser();
  const isAiMessage = role === "assistant"
  return (
    <div className={cn('mb-3 flex items-center', isAiMessage ? "justify-start me-5" : "ms-5 justify-end")}>

      {isAiMessage && <MagicWandIcon className='mr-2 shrink-0' />}
      <p className={cn("rounded-md border px-3 py-1  max-w-[20rem] text-[0.95rem]", isAiMessage ? "" : "bg-primary dark:font-semibold  text-primary-foreground")}>
        {content}
      </p>

      {!isAiMessage && user?.imageUrl && (
        <Image
          src={user.imageUrl}
          alt='User Image'
          width={30}
          height={30}
          className='ml-2 rounded-full object-cover'
        />
      )}

    </div>
  )
}
