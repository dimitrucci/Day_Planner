$(function () {
    let today = $("#today");
    today.text(moment().format('dddd, MMMM Do'));

    let calendarBox = $("#calendar-box");
    let arr = [];
    let date = new Date();
    let newDate = new Date(date.setHours(9,0,0,0));

    let currentTime = moment(new Date().setMinutes(0, 0,0)).format('LT');
    getLocal = () => {
        if(localStorage.getItem('calendar')){
            arr = JSON.parse(localStorage.getItem('calendar'));
        } else {
            arr = [{message:''},{message:''},{message:''},{message:''},{message:''},{message:''},{message:''},{message:''},{message:''}]
            localStorage.setItem('calendar', JSON.stringify(arr))
        }

        arr.forEach((item,index) => {
            let itemC = $(`<div class="calendar-item">
                <div class="time">
                    ${moment(newDate).add(index,'hour').format("LT")}
                </div>
                <textarea id="text-${index}" data-time="${moment(newDate).add(index,'hour').format("LT")}">${item.message}</textarea>
                <div class="save" data-index="${index}">
                    <button></button>
                </div>
            </div>`);
            calendarBox.append(itemC);
        });
    };
    getLocal();


    $(document).on('click','.save', function () {
        let index = $(this).data('index');
        arr[index].message = $(`#text-${index}`).val();
        localStorage.setItem('calendar', JSON.stringify(arr))
    });


    arr.forEach((item,index)=>{
        if($(`#text-${index}`).data('time') !== currentTime) {
            $(`#text-${index}`).addClass('past');
        }
        if($(`#text-${index}`).data('time') === currentTime){
            $(`#text-${index}`).addClass('active');
            for (let i = index+1; i<arr.length; i ++){
                $(`#text-${i}`).addClass('future');
            }
        }
    })
});
