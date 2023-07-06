
const domain = `https://fam.rcpod.space/api`
//запросы для точек пожаров и информации к ним
export const URL_FOR_MARKS = {
    URL_SINGLE_DAY: `${domain}/fires/points/?date=`,
    URL_TODAY: `${domain}/fires/points/today/`,
    URL_DAYS_RANGE: `${domain}/fires/points/?date_min=`,
    URL_WEEK: `${domain}/fires/points/week/`,
    URL_LAST_24_HOURS: `${domain}/fires/points/twentyfourhours/`,
    URL_GET_INFO: `${domain}/fires/days/`,
    URL_GET_TIME_FROM_DATE: `${domain}/fires/time_of_date/`
}

//зарпосы для управления аккаунтов пользователя
export const URL_FOR_USER = {
    URL_CREATE: `${domain}/auth/jwt/create/`,
    URL_REFRESH: `${domain}/auth/jwt/refresh/`,
    URL_EDIT_MYSELF: `${domain}/auth/user/me/`,
    URL_REGISTER: `${domain}/auth/users/`,
    URL_GET_USER_INFO: `${domain}/auth/user/me/`,
    URL_CONFIRM_RESTORE_PASS: `${domain}/auth/users/confirm_reset_password/`,
    URL_RESTORE_PASSWORD: `${domain}/auth/users/reset_password/`,
}

//запросы для формирования файлов .shp И .pdf
export const URL_FOR_FILES = {
    URL_SHP_DATETIME: `${domain}/fires/load/shapefile/`,
    URL_PDF: `${domain}/fires/load/pdf/`,
    URL_FOR_SETTLEMENTS: `${domain}/fires/settlement_least_5/`,
}

//относительные пути для различных полигонов
export const URL_FOR_COORDS = {
    COUNTRY_COORDS: `data/coordinateFiles/countryCoordsNew.json`,
    NATURE_RESERVES_COORDS: `data/coordinateFiles/NatureReservesCoords.json`,
    SETTLEMENTS: 'data/coordinateFiles/settLements.js',
}

//относительные пути для картинок (устаревшая версия)
export const URL_FOR_IMAGES = {
    IMG_DOMAIN: `https://geosib.rcpod.ru/tile/tile/zxy/`
}

//словарь с субьектами и их тэгами
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

//словарь с обьектами подстилающих слоев + накладываемых слоев
export const layersDict = [
    {   name: 'Улицы',
        type: 'baseLayer',
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'},
    {
        name: 'Улицы 2',
        type: 'baseLayer',
        url: 'https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png'
        //url: 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoicnViaW5uYXciLCJhIjoiY2xiMTFmcnZmMXBnbDNwbXA4bHFkcDdyciJ9.CxX9zdanJzvnGxgEDz7bJw'
    },
    {
        name: 'Тёмная',
        type: 'baseLayer',
        url: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
    },
    {
        name: 'ESRI',
        type: 'baseLayer',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    },

    {name: 'Точки возгорания', type: 'markersOverlay', url: null},
    {name: 'Границы регионов', type: 'regionBorders', url: null},
    {name: 'Заповедники', type: 'natureReserves', url: null},
    {name: 'Населённые пункты (+5км от ТВВ)', type: 'settlement', url: null},
    {name: 'Suomi NPP', type: 'Suomi NPP', url: null},
    {name: 'NOAA-20', type: 'NOAA-20', url: null}
]

export const imageSettings = [
    {
        name: 'Видимые + ИК',
        type: 'ImageOptional',
        composite: `~gi5t_-C220+300+.5~ri3a_+C.04.8+2_i2a_+_i1a_+`

    },
    {
        name: 'Натуральные цвета',
        type: 'ImageOptional',
        composite: `~ri1a_+C0+1+2_v4a_+_v3a_+`

    },
    {
        name: 'ИК',
        type: 'ImageOptional',
        composite: `~ri4t_-C220+322+.4_i5t_+_i5t_+`

    },
    {
        name: 'Дымы',
        type: 'ImageOptional',
        composite: `~rv3a_+C.032.13+1.8_i1a_+C.02.23+1.8_i5t_-C260+300+.7`

    },

]