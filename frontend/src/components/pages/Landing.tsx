import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center h-screen items-center">
      <div className="max-w-screen-lg">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex justify-center">
            <img className="max-w-[496px] rounded-md" src="chess-board.png" />
          </div>
          <div className="pt-16">
            <div className="flex justify-center">
              <div className="text-5xl font-bold text-white font-sans">
                Play Chess Online
                <div className="ml-6">on the #1 Site!</div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded text-2xl"
                onClick={() => navigate("/play")}
              >
                Play Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
