import { useSocketContext } from "../context/SocketContext";

const useSocket = () => {
    return useSocketContext();
};

export { useSocket };
export default useSocket;
