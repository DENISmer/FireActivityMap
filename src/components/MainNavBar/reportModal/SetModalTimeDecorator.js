import dayjs from "dayjs";

export function SetModalTimeDecorator(context,setPdfDateTime){
        if(context.min_datetime){
            setPdfDateTime(dayjs(context.min_datetime).format("YYYY-MM-DDTHH:mm"))
        }
        else if(context.currentDate){
            setPdfDateTime(context.currentDate + 'T00:00')
        }

        return null
}