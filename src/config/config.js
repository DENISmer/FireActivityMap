export const URL_FOR_MARKS = {
    URL_SINGLE_DAY : `http://192.168.56.1:8080/api/fires/points/?date=`,
    URL_TODAY : 'http://192.168.56.1:8080/api/fires/points/today/',
    URL_DAYS_RANGE : `http://192.168.56.1:8080/api/fires/points/?date_min=`,
    URL_WEEK : `http://192.168.56.1:8080/api/fires/points/week/`,
    URL_LAST_24_HOURS : `http://192.168.56.1:8080/api/fires/points/twentyfourhours/`,
}

export const URL_FOR_IMAGES = {
    SOURCE : `data/map_images/chinfire`,
    IMAGE_TXT_START_NAME : `FY3D_MERSI_GBAL_L1_`,
    IMAGE_FY_3D_1000M_END_NAME : `_1000M_MS_7_20_21.png`,
    IMAGE_FY_3D_0250M_END_NAME : `_0250M_MS_smoke_250M.png`,
    TXT_END_NAME : `_1000M_MS.txt`,
}