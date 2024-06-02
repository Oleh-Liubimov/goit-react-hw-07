import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

export default function Contact({ data }) {
  const dispatch = useDispatch();
  return (
    <div className="border border-black flex flex-col gap-6 w-60 items-center rounded p-2">
      <div className="">
        <img
          src={data.avatar ? data.avatar : "/src/assets/boy-min.png"}
          alt=""
          className="mx-auto"
        />
        <p className="text-center">{data.name}</p>
        <p className="text-center">{data.number}</p>
      </div>
      <button
        type="button"
        className="bg-red-400
            border rounded border-slate-950 h-7 p-1 flex justify-center
            items-center hover:bg-red-500 transition-all"
        onClick={() => dispatch(deleteContact(data.id))}
      >
        Delete
      </button>
    </div>
  );
}
