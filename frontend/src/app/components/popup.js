import {FaceSmileIcon} from "@heroicons/react/24/outline";

const Popup = ({ message }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
            <div className="bg-[var(--background)] py-10 px-16 rounded-[16px] shadow-lg text-center">
                <p className="font-normal text-base">{message}</p>
                <FaceSmileIcon className="mt-4 mx-auto w-8 h-8" />
            </div>
        </div>
    );
};

export default Popup;