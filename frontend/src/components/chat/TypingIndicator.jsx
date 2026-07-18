const TypingIndicator = ({ typing }) => {

    if (!typing) return null;

    return (

        <div className="typing-indicator">

            <span></span>

            <span></span>

            <span></span>

            <small>

                Typing...

            </small>

        </div>

    );

};

export default TypingIndicator;