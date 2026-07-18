const emojis = [
    "😀",
    "😂",
    "😍",
    "❤️",
    "🔥",
    "👍",
    "👏",
    "🎉",
    "😎",
    "😭",
    "🙏",
    "🤝",
];

const EmojiPicker = ({ onSelect }) => {

    return (

        <div className="emoji-picker">

            {emojis.map((emoji) => (

                <button
                    key={emoji}
                    onClick={() => onSelect(emoji)}
                >

                    {emoji}

                </button>

            ))}

        </div>

    );

};

export default EmojiPicker;