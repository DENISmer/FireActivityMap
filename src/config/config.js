export const URL_FOR_MARKS = {
    URL_SINGLE_DAY : `http://45.146.167.192:8080/api/fires/points/?date=`,
    URL_TODAY : 'http://45.146.167.192:8080/api/fires/points/today/',
    URL_DAYS_RANGE : `http://45.146.167.192:8080/api/fires/points/?date_min=`,
    URL_WEEK : `http://45.146.167.192:8080/api/fires/points/week/`,
    URL_LAST_24_HOURS : `http://45.146.167.192:8080/api/fires/points/twentyfourhours/`,
    URL_GET_INFO : `http://45.146.167.192:8080/api/fires/days/`
}

export const URL_FOR_COORDS = {
    COUNTRY_COORDS : `data/coordinateFiles/countryCoords.json`,
    NATURE_RESERVES_COORDS : `data/coordinateFiles/NatureReservesCoords.json`,
}
export const URL_FOR_IMAGES = {
    SOURCE : `data/map_images/chinfire`,
    IMAGE_TXT_START_NAME : `FY3D_MERSI_GBAL_L1_`,
    IMAGE_FY_3D_1000M_END_NAME : `_1000M_MS_7_20_21.png`,
    IMAGE_FY_3D_0250M_END_NAME : `_0250M_MS_smoke_250M.png`,
    TXT_END_NAME : `_1000M_MS.txt`,
}