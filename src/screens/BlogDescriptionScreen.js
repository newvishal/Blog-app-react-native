import React from 'react';
import {ScrollView, View, Text, StyleSheet, Image} from 'react-native';

import moment from 'moment';

const BlogDescriptionScreen = ({route}) => {
  const {BlogDetail} = route.params;

  return (
    <ScrollView>
      <View
        style={{flex: 1, backgroundColor: '#ffffff', flexDirection: 'column'}}>
        <View style={styles.detailTitleContainer}>
          <View style={{flexDirection: 'column', marginHorizontal: 21}}>
            <Text style={styles.categoryName}>SADHAKOM</Text>
            <Text style={styles.title}>{BlogDetail.title.rendered}</Text>
            <View style={styles.dateAndPublisher}>
              <Text style={styles.textPublish}>Publish from Shadhak</Text>
              <Text style={styles.textPublish}>
                {moment(new Date(BlogDetail.date)).format('MMMM D, YYYY')}
              </Text>
            </View>
          </View>
          <Image
            style={styles.midBlogImage}
            source={require('../assets/images/logo.png')}
          />
        </View>
        <View style={styles.blogDescContainer}>
          <Text style={styles.blogText}>
            {BlogDetail.content.rendered.replace(/<\/?[^>]+(>|$)/g, '')}
          </Text>
          <View
            style={{
              flexDirection: 'column',
              flexWrap: 'wrap',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 12, marginBottom: 5, color: '#c3c4c7'}}>
              "Sadhak" Om Tiwari!
            </Text>
            <Text style={{fontSize: 12, color: '#d4d5d9'}}>💖 India</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  //blog detail
  detailTitleContainer: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
  categoryName: {
    color: '#bc0000',
    fontSize: 14,
    marginVertical: 10,
  },
  title: {
    fontSize: 21,
  },
  dateAndPublisher: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textPublish: {
    fontSize: 12,
    color: '#cdcdcd',
    marginVertical: 10,
  },
  midBlogImage: {
    height: 200,
    width: 'auto',
  },
  blogDescContainer: {
    flex: 1,
  },
  blogText: {
    fontSize: 18,
    flexWrap: 'wrap',
    paddingHorizontal: 21,
    paddingVertical: 21,
  },
});

export default BlogDescriptionScreen;
