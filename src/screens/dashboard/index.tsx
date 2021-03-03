import {StackScreenProps} from '@react-navigation/stack';
import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import moment from 'moment';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import {Colors, Fonts} from '../../common';
import ScrollableContainer from '../../components/ScrollableContainer';

import DashboardHeader from './DashboardHeader';
import LoadingModal from 'src/components/LoadingModal';
import {RootStackParamList} from 'src/navigation/routes';
import AnimatedTabs, {tabRef} from 'src/components/AnimatedTabs';
import {IAnime, IJoke} from 'src/interfaces/global';
import Input from 'src/components/Input';
import JokeCard from './JokeCard';
import AnimeCard from './AnimeCard';
import {useGlobalDispatch} from 'src/contexts/globalContext';

type Props = StackScreenProps<RootStackParamList, 'Dashboard'>;

const Dashboard: FunctionComponent<Props> = ({navigation}) => {
  const {getAnime, getJokes} = useGlobalDispatch();
  const tabRef = useRef<tabRef>(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(0);
  const [loadingAnimes, setLoadingAnimes] = useState(false);
  const [loadingJokes, setLoadingJokes] = useState(false);
  const [jokes, setJokes] = useState<Array<IJoke>>();
  const [jokeList, setJokeList] = useState<Array<IJoke>>();
  const [animes, setAnimes] = useState<Array<IAnime>>();
  const [animesList, setAnimesList] = useState<Array<IAnime>>();

  useEffect(() => {
    setLoadingAnimes(true);
    setLoadingJokes(true);
    getAnime()
      .then((resp) => {
        setLoadingAnimes(false);
        if (resp && resp.statusCode === 200) {
          setAnimes(resp.data.data);
          setAnimesList(resp.data.data);
        }
      })
      .catch((e) => {
        setLoadingAnimes(false);
      });

    getJokes()
      .then((resp) => {
        setLoadingJokes(false);
        if (resp && resp.statusCode === 200) {
          setJokes(resp.data);
          setJokeList(resp.data);
        }
      })
      .catch((e) => {
        setLoadingJokes(false);
      });
  }, []);

  function generateGreetings() {
    const currentHour = moment().format('HH');

    if (parseInt(currentHour, 10) >= 3 && parseInt(currentHour, 10) < 12) {
      return 'Good Morning';
    } else if (
      parseInt(currentHour, 10) >= 12 &&
      parseInt(currentHour, 10) < 15
    ) {
      return 'Good Afternoon';
    } else if (
      parseInt(currentHour, 10) >= 15 &&
      parseInt(currentHour, 10) < 20
    ) {
      return 'Good Evening';
    } else if (
      parseInt(currentHour, 10) >= 20 &&
      parseInt(currentHour, 10) < 3
    ) {
      return 'Good Night';
    } else {
      return 'Hello';
    }
  }

  function onTabChange(index: number) {
    console.log(index);
    setTab(index);
  }

  function renderJoke({item, index}: ListRenderItemInfo<IJoke>) {
    return <JokeCard item={item} />;
  }

  function renderAnime({item, index}: ListRenderItemInfo<IAnime>) {
    return <AnimeCard item={item} />;
  }

  function onSearchJokesQuery(query: string) {
    if (!query || query.length < 2) {
      setJokeList(jokes);
      return;
    }

    const f = jokes?.filter((val: IJoke) => {
      if (
        val.setup &&
        query &&
        (val.setup.toLocaleLowerCase().includes(query.toLocaleLowerCase()) ||
          val.punchline.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
      ) {
        return true;
      }
    });
    setJokeList(f);
  }

  function onSearchAnimesQuery(query: string) {
    if (!query || query.length < 2) {
      setAnimesList(animes);
      return;
    }

    const f = animes?.filter((val: IAnime) => {
      if (
        val.attributes.canonicalTitle &&
        query &&
        (val.attributes.canonicalTitle
          .toLocaleLowerCase()
          .includes(query.toLocaleLowerCase()) ||
          val.attributes.description
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()))
      ) {
        return true;
      }
    });
    setAnimesList(f);
  }

  function renderTabList() {
    if (tab === 0) {
      return (
        <View style={{flex: 1}}>
          {!!loadingJokes && <Text style={{marginLeft: Fonts.w(20)}}>Loading jokes</Text>}
          {!!jokes && (
            <View
              style={{
                paddingBottom: Fonts.h(10),
                paddingHorizontal: Fonts.w(20),
              }}>
              <Input
                noLabel
                textStyle={{paddingVertical: Fonts.h(11)}}
                placeholder="Search for Jokes"
                leftIcon="search"
                onChangeText={onSearchJokesQuery}
              />
            </View>
          )}
          <FlatList<IJoke>
            keyboardShouldPersistTaps="handled"
            // alwaysBounceVertical={false}
            style={{flex: 1}}
            data={jokeList}
            renderItem={(props) => renderJoke(props)}
            keyExtractor={(item, index) => index.toString()}
            extraData={jokeList}
            ItemSeparatorComponent={() => <View />}
            getItemLayout={(data, index) => ({
              length: Fonts.h(98),
              offset: Fonts.h(98) * index,
              index,
            })}
            // nestedScrollEnabled={true}
          />
        </View>
      );
    }

    if (tab === 1) {
      return (
        <View>
          {!!loadingAnimes && <Text style={{marginLeft: Fonts.w(20)}}>Loading animes</Text>}
          {!!animes && (
            <View
              style={{
                paddingBottom: Fonts.h(10),
                paddingHorizontal: Fonts.w(20),
              }}>
              <Input
                noLabel
                textStyle={{paddingVertical: Fonts.h(11)}}
                placeholder="Search for Animes"
                leftIcon="search"
                onChangeText={onSearchAnimesQuery}
              />
            </View>
          )}
          <FlatList<IAnime>
            keyboardShouldPersistTaps="handled"
            alwaysBounceVertical={false}
            data={animesList}
            renderItem={(props) => renderAnime(props)}
            keyExtractor={(item, index) => index.toString()}
            extraData={animesList}
            ItemSeparatorComponent={() => (
              <View style={{height: Fonts.h(10)}} />
            )}
            getItemLayout={(data, index) => ({
              length: Fonts.h(98),
              offset: Fonts.h(98) * index,
              index,
            })}
            nestedScrollEnabled={true}
          />
        </View>
      );
    }
  }

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'white',
          paddingBottom: 20,
        }}>
        <View style={{flex: 1}}>
          <View style={{paddingHorizontal: Fonts.h(22)}}>
            <DashboardHeader
              navigation={navigation}
              message={`${generateGreetings()}`}
              onLogout={() => {
                navigation.navigate('Login');
              }}
            />
          </View>
          <Text
            style={{
              fontFamily: Fonts.AVERTA_LIGHT,
              fontSize: Fonts.w(14),
              color: Colors.defaultText,
              marginTop: Fonts.h(15),
              marginHorizontal: Fonts.w(20),
            }}>
            “Those who set goals are 10x more likely to succeed in them” ~ James
            Macarthy
          </Text>
          <View
            style={{
              paddingHorizontal: Fonts.w(20),
            }}>
            <AnimatedTabs
              ref={tabRef}
              style={{marginTop: Fonts.h(10), height: Fonts.h(38)}}
              data={[{text: 'Jokes'}, {text: 'Anime'}]}
              onChange={onTabChange}
            />
          </View>
          <View style={[{paddingTop: Fonts.h(10), flex: 1}]}>
            {renderTabList()}
          </View>
        </View>
        <LoadingModal loading={loading} />
      </SafeAreaView>
    </>
  );
};

export default Dashboard;
