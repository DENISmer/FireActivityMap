import dayjs from "dayjs";

export function SetModalTimeDecorator(context,setPdfDateTime){
        if(context.min_datetime){
            setPdfDateTime(dayjs(context.min_datetime).format("YYYY-MM-DDThh:mm"))
        }
        else if(context.currentDate){
            setPdfDateTime(dayjs(context.currentDate + 'T00:00').format("YYYY-MM-DDThh:mm"))
        }

        return null
}