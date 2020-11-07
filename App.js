import React,  { Component } from 'react'
import { View, Text,StyleSheet, ActivityIndicator, FlatList, Image, TouchableWithoutFeedback, Linking, Share } from 'react-native';


export default class App extends Component {
  state = {
    news: [],
    loading: true
  }
  fetchNews = () => {
    fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=0b4db5c243c94295b80815809fff5fc0").
    then(res => res.json).
    then(response => {
      this.setState({
        news: response.articles,
        loading: false
      })
    })
  }
  componentDidMount(){
    this.fetchNews()
  }
  shareArticle = async article => {
  try {
    await Share.share({
      message: "Check out this article " + article
    })
  } catch (error) {
    console.log(error);
  }
  }
  render(){ 
     if(this.state.loading){
      return ( <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff"}}>
        <ActivityIndicator size="large" color="#fff"  />
      </View>
      );
    }
    else {
      return(
        <View style={styles.container}>
          <View style={{padding: 30}}>
           <Text style={{alignItems: "center", fontSize: 35, color: "#fff"}}>Top</Text>
           <Text style={{alignItems: "center", fontSize: 35, color: "#fff"}}>Headline</Text>
          </View>
          <View style={styles.news}>
            <FlatList 
              data={this.state.news}
              renderItem={ ({item}) => {
                return (
                  <TouchableWithoutFeedback onPress={()=>Linking.openURL(item.url)}>
                    <View style={{height: 1200, backgroundColor: "#fff",marginBottom: 15, borderRadius: 15 }}>
                    <Image source={{uri: item.uriToImage}} style={[StyleSheet.absoluteFill, {borderRadius: 15}]} />
                    <View style={styles.gradient}>
                      <Text style={{position: "absolute", bottom: 0, color: "#fff",fontSize: 20,padding: 5}}>{item.title}</Text>
                      <Text style={{position: "absolute",top: 0,right: 0, color: "#fff", fontSize: 16,padding: 5,fontWeight: "bold"}} 
                      onPress={()=>this.shareArticle(item.url)}>Share</Text>
                    </View>
                  </View>
                  </TouchableWithoutFeedback>
                )
              }
              }
             />
          </View>
        </View>
      );
    }
  }
}
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: "#333"
   },
   news: {
    alignSelf: "center"
   },
   gradient: {
     width: "100%",
     height: "100%",
     backgroundColor: "rgba(0,0,0,0.5)",
     borderRadius: 15
   },
 })
