import React, { useEffect, useState } from 'react';
import { Text,View,TextInput,TouchableOpacity,Image } from 'react-native';
import axios from 'axios';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign,MaterialIcons ,Feather} from '@expo/vector-icons';
const MyComponent = ({onUpdate}) => {
  const [checker,setchecker]=useState({userName:null,nameChange:false,usernamechange:false,userId:false,userIdCheckers:true})
  const [values,setvalues]=useState({})
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(()=>{
    async function handleusersId(){
      const userId = (await AsyncStorage.getItem("@AnnoncementUserNameId")) || "annoncer89340lop467";
      const id = (await AsyncStorage.getItem("Annoncement:Annoncer")) 
      setchecker((pre)=>({...pre,userNameIdS:userId,usersid:id}))
    }
    handleusersId()
  },[values.UserId])
  async function handleSubmit(value){
if(value==='UserName'){
  if(values.userName===undefined){
    setchecker((previous)=>({...previous,userNameErrors:'Enter user name'}))
  }
    else if(values.userName.length>3){
      try{
   await axios.post('https://annoncement-annocer-backend.vercel.app/UserName',{
        id:checker.usersid,
        UserName:values.userName,
      })
    await AsyncStorage.setItem("@AnnoncementUserName",values.userName)
      setchecker((previous=>({...previous,usernamechange:false,nameChange:true,userNameErrors:undefined})))
    console.log('worked')  
    }
      catch(err){console.log(err)}
    }
    else{
    setchecker((previous)=>({...previous,userNameErrors:'user name minimum length 3'}))
    }
  }
  else{
    if(values.UserId===undefined){
      setchecker((pre)=>({...pre,userIdErrors:'Enter the User id'}))
    }
    else if(values.UserId.length>=7){
    await AsyncStorage.setItem("@AnnoncementUserNameId",values.UserId);
  
      setchecker((pre)=>({...pre,userId:false,userIdErrors:undefined,userIdCheckers:false}))
    }
    
    else{
      console.log('error')
      setchecker((pre)=>({...pre,userIdErrors:'minimum length 7'}))
    }
  }
}

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Courgette': require('../assets/fonts/Courgette.ttf'),
        'Tangerine':require('../assets/fonts/Tangerine.ttf'),
        'Monoton':require('../assets/fonts/Monoton.ttf'),
        'Sriracha':require('../assets/fonts/Sriracha.ttf'),
        'MuseoModerno':require('../assets/fonts/MuseoModerno.ttf')
      });
      const account=(await AsyncStorage.getItem("@Annoncement:Annoncer"))
      const userName= await AsyncStorage.getItem("@AnnoncementUserName")
      const id = (await AsyncStorage.getItem("Annoncement:Annoncer"))
      const Email= await AsyncStorage.getItem("@Annoncement:AnnoncerEmail")
  setchecker((previous)=>({...previous,userName:userName,AccountType:account,__id:id,userEmailId:Email}))
      setFontLoaded(true);
    };

    loadFont();
  }, []); 
  if (!fontLoaded) {
    return null;
  }
  
  return (
    <>
    <View
style={{
  position:'absolute',
  top:0,
  left:10
}}
>
  <TouchableOpacity
  onPress={()=>{
    onUpdate('profileDetails',true)
  }}
  >
  <AntDesign name="arrowleft" size={35} color="black" />
  </TouchableOpacity>
</View>
    
    <Text style={{fontFamily:'Courgette',fontSize:30,marginTop:15}}>
      {`hello  ${checker.nameChange?values.userName:checker.userName} 👋`}
    </Text>
    
    <MaterialIcons name="account-circle" size={100} color="black" />
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:30 ,gap:10}}>
    <Text style={{flex:1,fontFamily:'Courgette',fontSize:20}}>Account:</Text>
    <Text style={{flex:2,fontFamily:'Sriracha',fontSize:20,fontWeight:300}}>{checker.AccountType}</Text>
    <View style={{flex:1}}>
    <Image
       style={{
           width: 30,
            height: 30,
}}
                    source={{
                      uri:
                       checker.AccountType === "Admin"
                          ? "https://i.pinimg.com/564x/25/43/90/254390f7eecd9b51127e333ed12f0c1e.jpg"
                          : "https://i.pinimg.com/1200x/07/92/fc/0792fce6b64f2acfca56081729fde083.jpg",
                    }}
                  />
    </View>
</View>
<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:30 ,gap:10}}>
    <Text style={{flex:1,fontFamily:'Courgette',fontSize:20}}>Ref Id  :</Text>
    <Text style={{flex:2,fontFamily:'Sriracha',fontSize:18,fontWeight:300,left:-30}}>{checker.__id}</Text>
</View>
<View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:30 ,gap:10}}>
    <Text style={{flex:1,fontFamily:'Courgette',fontSize:20}}>Email   :</Text>
    <Text style={{flex:2,fontFamily:'Sriracha',fontSize:18,fontWeight:300,left:-30}}>{checker.userEmailId}</Text>
</View>
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:30 ,gap:10}}>
      <Text style={{flex:1,fontFamily:'Courgette',fontSize:20}}>Name  :</Text>
    <View style={{width:'30%',flex:2,
    borderBottomWidth:checker.userNameErrors?2:0,
    borderBottomColor:checker.userNameErrors?'red':'white',
    height:40,backgroundColor:'white',shadowColor:'black',elevation:10,borderRadius:5}}>
    {!checker.usernamechange?<Text style={{paddingLeft:10,paddingTop:5,fontWeight:600,fontSize:20,fontFamily:'Sriracha'}}>{checker.nameChange?values.userName:checker.userName}</Text>:
    <TextInput value={values.userName?values.userName:''} placeholder='User Name' style={{paddingLeft:10,height:'100%',width:'100%'}} onChangeText={(text)=>setvalues((previous)=>({...previous,userName:text}))} />
  }
  <Text style={{color:'red',fontSize:8,top:-10,paddingLeft:10}}>{checker.userNameErrors?checker.userNameErrors:''}</Text>
  </View>
  {!checker.usernamechange?
      <TouchableOpacity style={{flex:1}} 
      onPress={()=>setchecker((previous)=>({...previous,usernamechange:true}))}
      >
      <Feather name="edit" size={24} color="black" />
      
      </TouchableOpacity>
      :<TouchableOpacity style={{flex:1}} 
      onPress={()=>handleSubmit('UserName')}
      ><AntDesign name="save" size={24} color="black" /></TouchableOpacity>
      }
    </View>
    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:30 ,gap:10}}>
      <Text style={{flex:1,fontFamily:'Courgette',fontSize:20}}>User Id:</Text>
    <View style={{width:'50%',flex:2,height:40,backgroundColor:'white',
    borderBottomWidth:checker.userIdErrors?3:0,
    borderBottomColor:checker.userIdErrors?'red':'white'
    ,shadowColor:'black',elevation:10,borderRadius:5}}>
    {!checker.userId?<Text style={{paddingLeft:10,paddingTop:5,fontWeight:600,fontSize:15,fontFamily:'Sriracha'}}>{!checker.userIdCheckers?values.UserId:checker.userNameIdS}</Text>:
    <TextInput placeholder='User Id' 
    value={values.UserId}
    onChangeText={(text)=>{setvalues((pre)=>({...pre,UserId:text}))}}
    style={{paddingLeft:10,height:'100%',width:'100%',
  }} 
    />
}
<Text style={{color:'red',fontSize:8,top:-10,paddingLeft:10}}>{checker.userIdErrors?checker.userIdErrors:''}</Text>
    </View>
    {!checker.userId?
    <TouchableOpacity style={{flex:1}}
    onPress={()=>setchecker((pre)=>({...pre,userId:true}))}
    >
    <Feather name="edit" size={24} color="black" />
    </TouchableOpacity>
     :<TouchableOpacity style={{flex:1}} 
     onPress={()=>handleSubmit('userId')}
     ><AntDesign name="save" size={24} color="black" /></TouchableOpacity>
}
    </View>
    </>
  );
};

export default MyComponent;
