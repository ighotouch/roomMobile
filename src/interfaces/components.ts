import { ViewProps } from "react-native";

export interface TouchItemProps extends ViewProps {
  noFeedback?: boolean;
  children: React.ReactNode;
  ripple?: boolean;
  white?: boolean;
  onPress?: () => any;
}


export interface CarouselImageListItem {
  image: number
}



export interface CarouselProps {
  items: Array<CarouselImageListItem>
}
