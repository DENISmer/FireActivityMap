import dayjs from "dayjs";

export function SetModalTimeDecorator(context,setPdfDateTime){
    const date = new Date()
        if(context.min_datetime){
            setPdfDateTime(dayjs(context.min_datetime).format("YYYY-MM-DDTHH:mm"))
        }
        else if(context.currentDate){
            setPdfDateTime(dayjs(context.currentDate + 'T00:00').format("YYYY-MM-DDTHH:mm"))
        }
        else if(context.today){
            setPdfDateTime(dayjs(date).format("YYYY-MM-DDTHH:mm"))
        }
        return null
}