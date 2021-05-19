const NetworkError = ({setBodyState}) => {
    return (
        <div>
            <div>Sorry, Couldn't reach server !!</div>
            <button onClick={() => setBodyState('root')}>Back</button>
        </div>
    )
};

export default NetworkError;
