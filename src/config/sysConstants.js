 //no-unused-vars
 export const REST_API_PREFIX_DEV = "http://localhost:8080/pentu/api";
 //no-unused-vars
 export const LOGIN_API_PREFIX_DEV = "http://localhost:8080/pentu/login";

 //no-unused-vars
 export const REST_API_PREFIX_PRODUCT = "https://www.pentu.nickshi.com/pentu/api";
 //no-unused-vars
 export const LOGIN_API_PREFIX_PRODUCT = "https://www.pentu.nickshi.com/pentu/login";



export const ACCESS_TOKEN = "PENTU_TOKEN";              //token key
export const TOKEN_EXPIRED_TIME = "PENTU_TOKEN_EXPIRED_TIME";


export const PAGE_SIZE_COUNT = 10;

export const COATING_TYPES = {
  METAL: {
    key: "METAL",
    title: "金属涂层"
  },
  CERAMIC: {
    key: "CERAMIC",
    title: "陶瓷涂层"
  }, 
  ELECTROLYTE : {
    key: "ELECTROLYTE",
    title: "电解质涂层"
  },
  VACUUM: {
    key: "VACUUM",
    title: "真空冷喷涂涂层"
  },
  AIR_COLD: {
    key: "AIR_COLD",
    title: "大气冷喷涂涂层"
  },
  AURORA: {
    key: "AURORA",
    title: "激光熔覆涂层"
  }
}

export const PLATING_TYPES = {
  HIGH_SPEED_FLAME: {
    key: "HIGH_SPEED_FLAME",
    title: "高速火焰喷涂技术"
  },
  AIR_COLD: {
    key: "AIR_COLD",
    title: "大气冷喷涂技术"
  },
  VACUUM_COLD: {
    key: "VACUUM_COLD",
    title: "真空冷喷涂技术"
  },
  AIR_PLASMA: {
    key: "AIR_PLASMA",
    title: "大气等离子喷涂技术"
  },
  AIR_LAYER_PLASMA: {
    key: "AIR_LAYER_PLASMA",
    title: "大气层流等离子喷涂技术"
  },
  LOW_PRESSURE_PLASMA: {
    key: "LOW_PRESSURE_PLASMA",
    title: "低压等离子喷涂技术"
  },
  LOW_PRESSURE_PHY: {
    key: "LOW_PRESSURE_PHY",
    title: "低压等离子物理气相喷涂技术"
  },
  SUPER_HIGH_SPEED_AURORA:{
    key: "SUPER_HIGH_SPEED_AURORA",
    title: "超/高速激光熔覆/喷涂技术"
  }
}

export const POWDER_RATE_UNITS = {
  R_MIN:{
    key: "R_MIN",
    title: "r/min"
  },
  G_MIN:{
    key: "G_MIN",
    title: "g/min"
  },
  KG_MIN:{
    key: "KG_MIN",
    title: "kg/min"
  },
  KG_H: {
    key: "KG_H",
    title: "kg/h"
  },
  PA:{
    key: "PA",
    title: "Pa"
  }
}