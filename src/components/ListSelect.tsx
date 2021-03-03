import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useRef,
  useState,
  useImperativeHandle
} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Text,
  FlatList,
  Keyboard,
  ListRenderItemInfo,
  Dimensions,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {Icon} from 'react-native-vector-icons/Icon';
import {Colors, Fonts} from 'src/common';
import {itemType} from 'src/interfaces/input';
import { MyInputHandles } from './Input';
import SearchHeader from './SearchHeader';
import Separator from './Separator';
import SlideModal, {sliderRef} from './SlideModal';
import VectorIcon from './VictorIcon';

const WINDOW = Dimensions.get('window');
const HEIGHT = WINDOW.height;


type Props = {
  key: number;
  data?: Array<itemType>;
  loading?: boolean;
  editable?: boolean;
  fullHeight?: boolean;
  label?: string;
  placeholder?: string;
  optional?: boolean;
  hideLabel?: boolean;
  map: {val: string; desc: string};
  onSelected?: ( text: string) => void;
  selectStyle?: StyleProp<ViewStyle>;
};



const ListSelect: ForwardRefRenderFunction<MyInputHandles, Props> = (
  {
    data,
    loading = false,
    label,
    map,
    placeholder,
    fullHeight = false,
    editable = true,
    onSelected,
    optional = false,
    hideLabel= false,
    selectStyle
  },
  ref,
) => {
  const slideModalRef = useRef<sliderRef>(null);
  const [items, setItems] = useState<itemType[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<itemType>();

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  useEffect(() => {
    const lenForSearch = 0;
    if (search.trim().length > lenForSearch && map) {
      const newItems = items.filter((item) =>
        item[map.desc].toLowerCase().includes(search.toLowerCase()),
      );
      setItems(newItems);
    } else {
      if (data) setItems(data);
    }
  }, [search]);


  useImperativeHandle(ref, () => ({
    focusInput: () => {
      // inputRef?.current?.focus();
    },
    checkValidation: () => {
      let errorCount = validate();
      return errorCount;
    },
  }));

  function renderSelectContent() {
    if (loading) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[
              {
                height: '100%',
                flex: 1,
                fontSize: Fonts.w(14),
                fontFamily: Fonts.AVERTA_REGULAR,
                color: Colors.darkText,
              },
            ]}>
            Loading
          </Text>
        </View>
      );
    }

    if (items.length === 0) {
      return (
        <Text
          style={[
            {
              height: '100%',
              flex: 1,
              fontSize: Fonts.w(14),
              fontFamily: Fonts.AVERTA_REGULAR,
              color: Colors.darkText,
            },
          ]}>
          No {label}s available
        </Text>
      );
    }

    if (!selectedItem || selectedItem[map.val] === undefined) {
      return (
        <Text
          style={[
            {
              flex: 1,
              fontSize: Fonts.w(14),
              fontFamily: Fonts.AVERTA_REGULAR,
              color: Colors.darkText,
            },
          ]}>
          {placeholder}
        </Text>
      );
    }

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // width: 84,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'column'}}>
          <Text style={{}} numberOfLines={1}>
            {selectedItem? selectedItem[map?.desc]: ''}
          </Text>
          {/* {renderAdditionalContent(selectedItem)} */}
        </View>

        <Text style={{}}></Text>
      </View>
    );
  }


  function validate(): number{
    return selectedItem? 0: 1
  }

  function handleOnSelectPress() {
    if (loading || !editable || !items || items.length === 0) {
      return;
    }

    slideModalRef.current?.toggleModal();
  }

  function renderSelect() {
    return (
      <View>
        <View
          style={{
            marginBottom: !hideLabel? Fonts.h(8): 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: Fonts.w(2),
          }}>
          {!hideLabel && <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: Fonts.AVERTA_REGULAR,
                fontSize: Fonts.w(13),
                color: Colors.darkText,
              }}>
              {label}
            </Text>

            {!!optional && (
              <Text
                style={{color: Colors.primaryColor, marginLeft: Fonts.w(4)}}>
                (Optional)
              </Text>
            )}
          </View>}

         

        </View>
        <TouchableWithoutFeedback onPress={handleOnSelectPress}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 2,
            }}>
            <View
              style={[{
                flexDirection: 'row',
                borderWidth: 1,
                height: Fonts.h(50),
                width: Fonts.w(336),
                borderColor: Colors.inputBorder,
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: Fonts.w(10),
                paddingHorizontal: Fonts.w(13),
                backgroundColor: Colors.white,
              },selectStyle]}>
              {renderSelectContent()}
              <VectorIcon name="arrow-down" size={Fonts.w(17)} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  function onSearch(search: string) {
    setSearch(search);
  }

  function renderFullHeader() {
    return <SearchHeader onChange={onSearch} />;
  }

  function renderSmallHeader() {
    return (
      <View>
        <Text>{placeholder}</Text>
      </View>
    );
  }

  function handleOnItemSelected(item: itemType, preselect?: boolean) {
    console.log(item, map)
    if (!onSelected) {
      setSelectedItem(item);
    }else{
      setSelectedItem(item);
      onSelected(item[map?.val])
    }

    Keyboard.dismiss();
    setSearch('');

    if (!preselect) {
      slideModalRef.current?.toggleModal();
    }
  }

  function renderItem({item, index}: ListRenderItemInfo<itemType>) {
    return (
      <TouchableWithoutFeedback onPress={() => handleOnItemSelected(item)}>
        <View key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              flex: 1,
              paddingVertical: Fonts.h(15),
              paddingHorizontal: Fonts.w(20),
              justifyContent: 'center',
            }}>
            <Text style={{}} numberOfLines={1}>
              {item.display? item.display:item[map?.desc].length > 25
                ? `${item[map?.desc]?.slice(0, 25)}...`
                : item[map?.desc]}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  function renderSectionList() {
    // const {map} = this.props;
    // return (
    //   <SortedList
    //     data={this.getSectionedData()}
    //     decoration={{type: 'text', param: map.desc}}
    //     title={map.desc}
    //     subline={map.subline}
    //     search={{
    //       value: this.state.search,
    //       paramsToFind: this.props.paramsToFind || [
    //         map.desc,
    //         map.val,
    //         map.subline,
    //       ],
    //     }}
    //     itemPress={this.itemSelected}
    //     searchInString={this.props.searchInString}
    //   />
    // );
  }

  function renderFlatList() {
    const ITEM_HEIGHT = Object.keys(map).length >= 3 ? 77 : 57;
    return (
      <View>
        <FlatList<itemType>
          keyboardShouldPersistTaps="handled"
          alwaysBounceVertical={false}
          data={items}
          renderItem={(props) => renderItem(props)}
          keyExtractor={(item, index) => index.toString()}
          extraData={items}
          ItemSeparatorComponent={() => <Separator />}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          contentContainerStyle={{paddingBottom: Fonts.h(100)}}
          nestedScrollEnabled={true}
        />
      </View>
    );
  }

  function renderList() {
    if (data && data.length > 5) {
      return renderFlatList();
    }else{
      return renderFlatList();
    }
  }

  function renderModal() {
    const full = (data && data.length > 5) || fullHeight;
    return (
      <SlideModal
        ref={slideModalRef}
        height={full? null: Fonts.h(750)}
        header={placeholder}
        fullHeight={full}>
        
        <View
          style={[
            fullHeight
              ? {height: HEIGHT / 1, flexShrink: 1, flex: 1}
              : {maxHeight: HEIGHT / 1.1},
          ,{paddingTop: Fonts.h(0)}]}>
          {full ? renderFullHeader() : null}
          {renderList()}
        </View>
      </SlideModal>
    );
  }

  return (
    <>
      {renderSelect()}
      {renderModal()}
    </>
  );
};

export default forwardRef(ListSelect);
