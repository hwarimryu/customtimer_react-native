

//actions
const TIMER_OPEN = 'TIMER_OPEN';
const TIMER_PLAY='TIMER_PLAY';
const TIMER_COUNTING = 'TIMER_COUNTING';
const TIMER_PAUSE='TIMER_PAUSE';
const TIMER_REPALY='TIMER_RESTART';
const TIMER_STOP='TIMER_STOP';

//actions creators
function openTimer(data){
    return{
        type: TIMER_OPEN,
        data: data
    }
}

playTimer=(payload)=>({type: TIMER_PLAY,payload})

function countTimer(){
    return{
        type: TIMER_COUNTING
    }
}

function pauseTimer(){
    return{
        type: TIMER_PAUSE
    }
}

function replayTimer(){
    return{
        type: TIMER_REPALY
    }
}

function stopTimer(){
    return{
        type: TIMER_STOP
    }
}

//reducer

const initialState = {
    //타이머 open했을 때 check 하는 state들
    thisTimerIsPlaying:false,
    cur_timer_id:"time_list1",
    //실행 중인 타이머 아니고 
    //타이머 실행할 때 사용하는 state들
    time_list:[],
    timer_on:false,
    repeat: 1,
    cur:1,    
}

function reducer(state = initialState,action){
    switch(action.type){
        case TIMER_OPEN:
            return applyOpenTimer(state,action);
        case TIMER_PLAY:
            return applyStartTimer(state,action);
        case TIMER_COUNTING:
            return applyCountingTimer(state);
        case TIMER_PAUSE:
            return applyPauseTimer(state,action);
        case TIMER_REPALY:
            return applyReplayTimer(state);
        case TIMER_STOP:
            return applyStopTimer(state);
        default: return state;
    }
}


// reducer function
function applyOpenTimer(state,action){
    console.log('reducer: applyOpenTimer')
    return{
        ...state,
        time_list:action.data.time_list,
        cur_timer_id:action.data.id,
    }
}
var timerInterval
function applyStartTimer(state,{payload}){

    console.log('reducer: applyStartTimer===',payload)
        // repeat = this.state.repeat;

        // state.time_list.filter( (e)=>{
        //     console.log(e.id+" "+ cur +" "+e.time);

        //     if(e.id===state.cur){
        //         // pause, stop 버튼 활성화
        //         // start 버튼 비활성화
        //         // console.log(initialState.time_list);

        //         timerInterval=BackgroundTimer.setInterval(()=>{
        //             e.time--;
        //             console.log(e.time);

        //             if(e.time<=0){
        //                 // this.playBell();

        //                 cur++;
                       
        //                 if(cur>length) {
        //                     if(repeat>=this.state.repeat){
        //                         this.stopTimer()                             
        //                         return {
        //                             ...state,
        //                             thisTimerIsPlaying:true,
        //                             timer_on:true,
        //                             cur:state.cur+1
        //                         }
        //                     }else {
        //                         console.log("repeat: "+repeat);
        //                         return {
        //                             ...state,
        //                             time_list: JSON.parse(initialState.time_list),
        //                             cur:state.cur+1,
        //                             repeat: state.repeat+1
        //                         }
        //                         // state.time_list =JSON.parse(initialState.time_list);
        //                         // cur=1
        //                         // repeat++;
        //                         // this.nextTimer();
        //                     }
        //                 }
        //                 // else this.nextTimer();
        //                 else return{
        //                     ...state,
        //                     thisTimerIsPlaying:true,
        //                     timer_on:true
        //                 }
        //             }

        //             this.setState(this.state);
                   
        //         },1000);
        //     }
        // });

        return (
            {
                ...payload,
                thisTimerIsPlaying:true,
                timer_on:true,
            }

        )
}

function applyCountingTimer(state){
    // var newState = 
    state.time_list.filter( (e)=>{
        console.log(e.id+" "+ state.cur +" "+e.time);

        if(e.id===timeId){
            
            console.log(state.time_list);

            // timerInterval=BackgroundTimer.setInterval(()=>{
                e.time--;
                console.log(e.time);

                if(e.time<=0){
                    console.log(e.time);

                //     this.playBell();

                    cur++;
                    if(cur>length) {
                        return{//stop 
                            initialState
                        }
                    }
                    // if(cur>length) {
                //         if(repeat>=this.state.repeat){
                //             this.stopTimer()                             
                //             return
                //         }else {
                //             console.log("repeat: "+repeat);
                //             this.state.time_list =JSON.parse(initialState.time_list);
                //             cur=1
                //             repeat++;
                //             this.nextTimer();
                //         }
                //     }
                //     else this.nextTimer();
                }

                // this.setState(this.state);
               
            // },1000);
        }
    });


    return{
        ...state,
    }
}
function applyPauseTimer(state){
    return{
        ...state,
    }
}

function applyReplayTimer(state){
    return{
        ...state
    }
}

function applyStopTimer(state){
    console.log('reducer: applyStopTimer')

    return{
        ...initialState,
        title:"change"
    }
}
// export actioncreator

const actionCreators={
    openTimer,
    playTimer,
    countTimer,
    pauseTimer,
    replayTimer,
    stopTimer
}
// export reducer
export {actionCreators}
export default reducer