export default function Player({ playerInfo }: { playerInfo: any }) {
  return (
    <div className="bg-[#daa520] w-full md:w-[34rem] p-3 flex  flex-col m-2 ease-in-out duration-700 rounded-sm  text-sm h-[24rem] md:h-[18rem]">
      <h3 className="font-semibold my-2 hidden">MY PLAYERS</h3>
      <div className="flex justify-between h-20 md:h-16">
        <img src="/default.png" className=" w-20 md:w-16  self-center " />
        <div className="bg-white px-2 w-3/4 border-solid border-[1px] border-[#9c9c9c]">
          <span>{playerInfo?.first_name}</span>
          <span>{playerInfo?.location}</span>
        </div>
      </div>
      <div className="bg-white px-2 w-full"></div>
    </div>
  );
}
