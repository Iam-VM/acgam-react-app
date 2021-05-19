const ConfirmBox = ({event, formSubmitHandler, setConfirmBoxFlag}) => {
    return (
        <div>
            <div>Are you sure you want to send ?</div>
            <div onClick={() => formSubmitHandler(event)}>Yes, I'm sure</div>
            <div onClick={() => setConfirmBoxFlag(false)}>Never mind</div>
        </div>
    );
};


export default ConfirmBox
