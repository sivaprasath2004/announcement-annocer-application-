export  const searchOptions=[
    {
    label:'All',
    value:'College',
  },{
    label:'Name',
    value:'name',
  },
  {
    label:'Reg No',
    value:'Reg_no'
  },{
    label:'Gender',
    value:'Gender'
  },{
    label:'Batch',
    value:'Batch'
  },
  {
    label:'Degree',
    value:'Degree'
  },
  {
   label:'Course',
    value:'Course'
  },{
   label:'Department',
   value:'Department'
  },{
   label:'Email',
    value:'Email'
  }
]
export const previewDetail=[
    {value:'Title'},{value:'Content'}
]
export const gender=[
    {value:'Gender'},{
        value:"Male"
    },{
        value:"Female"
    },{
        value:"Others"
    }
]
export const batch=[
    {value:'Batch'},{
        value:"2021-24"
    },{
        value:"2022-25"
    },{
        value:"2023-26"
    }
]
export const degree=[{value:"Degree"},{
        value:'UG'
},{
    value:"PG"
}]
export const course=[{value:'Course'},{
    value:"BA"
},{
    value:"BSC"
},{
    value:"BCOM"
},{
    value:"MSC"
},{
    value:"MCOM"
},{
    value:"MCW"
},{
    value:"BBA"
}]
export const department=[{value:'Department'},
    {value:'Tamil'},{value:"English"},{value:'History'},{value:'Political Science'},{value:'Defence & strategic studies'},{value:'Commerce'},{value:'CA-A'},{value:'CA-B'},{value:'PA'},{value:'Banking & Finance'},{value:'B & I'},{value:'Computer Science'},{value:'Computer Technology'},{value:'Information Technology'},{value:'Cyber Security'},{value:'Viscom'},{value:'CDF'},{value:'Food Science & Nutrition'},{value:'Computer Application'},{value:'Bussiness Management'},{value:'Physics'},{value:'Chemistry'},{value:'Mathemetics'},{value:'MicroBiology'},{value:'BioChemistry'},{value:'Social Work'},{value:'Corporate Secretaryship'}
]
export const images=[
    {
        id:1,
        url:'https://media.collegedekho.com/media/img/institute/crawled_images/None/erd3.JPG'
    },
    {
        id:2,
        url:'https://help.apple.com/assets/63FE2AC4F8C4756FAE6CEF81/63FE2AC4F8C4756FAE6CEF88/en_GB/e4dbb8e240d50cf30bab73b272a3760b.png'
    }
]
const dummyData = { images,searchOptions,gender,batch,degree,course,department,previewDetail};

export default dummyData;