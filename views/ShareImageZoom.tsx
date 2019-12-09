import React from "react";
import { Button, Image, View, Dimensions } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";

export interface IOnMove {
  type: string;
  positionX: number;
  positionY: number;
  scale: number;
  zoomCurrentDistance: number;
}

interface IProps {
  onMove: Function
}

export class ShareImageZoom extends React.PureComponent<IProps> {
  private imageZoom: React.RefObject<ImageZoom> = React.createRef<ImageZoom>();

  constructor(props: any) {
    super(props);

    this.handleCenterOn = this.handleCenterOn.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  private handleCenterOn() : void {
    this.imageZoom.current.centerOn({
      x: 0,
      y: 0,
      scale: 1.0,
      duration: 400
    })
  }

  public moveTo(params: IOnMove) : void {
    this.imageZoom.current.centerOn({
      x: params.positionX,
      y: params.positionY,
      scale: params.scale,
      duration: 400
    })
  }

  private handleMove(params: IOnMove) : void {
    this.props.onMove(params);
    // console.log(params);
  }

  render() : JSX.Element {
    return (
      <View>
        <ImageZoom
          ref={this.imageZoom}
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height-120}
          imageWidth={300}
          imageHeight={200}
          onMove={this.handleMove}>
          <Image
            style={{ width: 300, height: 200 }}
            source={{ uri: 'https://unsplash.it/300/200' }} />
        </ImageZoom>
        {/* <Button
          onPress={this.handleCenterOn}
          title="Resume" /> */}
      </View>
    );
  }
}