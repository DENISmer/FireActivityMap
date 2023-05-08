export const URL_FOR_MARKS = {
    URL_SINGLE_DAY : `http://45.146.167.192:8080/api/fires/points/?date=`,
    URL_TODAY : 'http://45.146.167.192:8080/api/fires/points/today/',
    URL_DAYS_RANGE : `http://45.146.167.192:8080/api/fires/points/?date_min=`,
    URL_WEEK : `http://45.146.167.192:8080/api/fires/points/week/`,
    URL_LAST_24_HOURS : `http://45.146.167.192:8080/api/fires/points/twentyfourhours/`,
    URL_GET_INFO : `http://45.146.167.192:8080/api/fires/days/`
}

export const URL_FOR_FILES = {
    URL_SHP_DATETIME : `http://45.146.167.192:8080/api/fires/load/shapefile/`, //get params:date_time=2022-11-12T12:15&subject_tag=ALTAY
    URL_PDF : `http://45.146.167.192:8080/api/fires/load/pdf/`, //get params:date_time=2022-11-12T12:15&subject_tag=ALTAY&cloud_shielding=12&operator_fio=xjxjjxx
    URL_FOR_SETTLEMENTS : `http://45.146.167.192:8080/api/fires/settlement_least_5/` //get params:date или date_min и date_max & list_ids=(true,yes,1,t,no, false, 0, f)
}

export const URL_FOR_COORDS = {
    COUNTRY_COORDS : `data/coordinateFiles/countryCoords.json`,
    NATURE_RESERVES_COORDS : `data/coordinateFiles/NatureReservesCoords.json`,
    SETTLEMENTS: 'data/coordinateFiles/settLements.json',
}
export const URL_FOR_IMAGES = {
    SOURCE : `data/map_images/chinfire`,
    IMAGE_TXT_START_NAME : `FY3D_MERSI_GBAL_L1_`,
    IMAGE_FY_3D_1000M_END_NAME : `_1000M_MS_7_20_21.png`,
    IMAGE_FY_3D_0250M_END_NAME : `_0250M_MS_smoke_250M.png`,
    TXT_END_NAME : `_1000M_MS.txt`,
}
export const subjectNames = [
    {name: 'Алтайский край', tag: 'ALTAY'},
    {name: 'Республика Бурятия', tag: 'BUR'},
    {name: 'Республика Алтай', tag: 'GALTAY'},
    {name: 'Иркутская область', tag: 'IRK'},
    {name: 'Кемеровская область', tag: 'KEM'},
    {name: 'Республика Хакасия', tag: 'KHAK'},
    {name: 'Ханты-Мансийский автономный округ - Югра', tag: 'HMAO'},
    {name: 'Красноярский край', tag: 'KRSN'},
    {name: 'Новосибирская область', tag: 'NSK'},
    {name: 'Омская область', tag: 'OMSK'},
    {name: 'Республика Саха (Якутия)', tag: 'SAHA'},
    {name: 'Томская область', tag: 'TOMSK'},
    {name: 'Республика Тыва', tag: 'TUVA'},
    {name: 'Тюменская область', tag: 'TUM'},
    {name: 'Ямало-Ненецкий автоноиный округ', tag: 'YANAO'},
    {name: 'Забайкальский край', tag: 'ZAB'}
]