import React, { useState } from 'react'
import { Button } from './ui/button';
import { LightningBoltIcon, MagicWandIcon } from '@radix-ui/react-icons';
import AiChatBox from './AiChatBox';

export default function AiChatBotButton() {
    const [chatBoxOpen, setChatBoxOpen] = useState(false);
    return (
        <>
            <Button variant={chatBoxOpen ? 'outline' : "default"} className='gap-2 w-full' onClick={() => setChatBoxOpen(!chatBoxOpen)}>
                <div>
                    {chatBoxOpen ? "Close AI" : " Ask AI"}
                </div>
                <MagicWandIcon />
            </Button>
            <AiChatBox open={chatBoxOpen} OnClose={() => setChatBoxOpen(false)} />
        </>
    )
}




