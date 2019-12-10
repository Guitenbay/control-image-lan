import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ShareImageZoom, IOnMove } from './views/ShareImageZoom';
import { Snackbar, TextInput, IconButton, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
};
const wsConfig = 'ws://192.168.31.199:8080';

interface IState {
  wsUrl: string
  isConnect: boolean,
  visible: boolean,
  sendable: boolean
}

export default class App extends React.PureComponent<{}, IState> {
  private shareImageZoom: React.RefObject<ShareImageZoom> = React.createRef<ShareImageZoom>();
  private ws: WebSocket;
  private snackbarText: string;
  private static deviceWidth: number = Dimensions.get("screen").width;

  constructor(props: any) {
    super(props);
    this.state = {
      wsUrl: wsConfig,
      isConnect: false,
      visible: false,
      sendable: false
    }

    this.handleOnMove = this.handleOnMove.bind(this);
  }

  private initWs(wsUrl: string): void {
    this.ws = new WebSocket(wsUrl);
    this.ws.onopen = () => {
      this.snackbarText = 'Seccussfully connect.'
      this.setState({ isConnect: true, visible: true });
    }

    this.ws.onmessage = ({ data }) => {
      const message = JSON.parse(data);
      if (!Object.is(message.positionX, undefined) && !Object.is(message.positionY, undefined) && !Object.is(message.scale, undefined)) {
        this.shareImageZoom.current.moveTo(message);
      }
    }

    this.ws.onerror = (e) => {
      this.snackbarText = 'Something wrong.'
      this.setState({ visible: true });
    }

    this.ws.onclose = (e) => {
      this.snackbarText = 'Seccussfully disconnect.'
      this.setState({ isConnect: false, visible: true });
    }
  }

  private closeWs(): void {
    this.ws.close();
  }

  private handleOnMove(params: IOnMove) {
    params.positionX -= App.deviceWidth / params.scale;
    (this.state.isConnect && this.state.sendable) ? this.ws.send(JSON.stringify(params)) : '';
  }

  render(): JSX.Element {
    return (
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <View style={styles.toolsbar}>
            <TextInput
              label='WebSocket'
              mode="outlined"
              style={{ flex: 1, height: 55 }}
              placeholder="Type here to connect!"
              onChangeText={(text) => this.setState({ wsUrl: text })}
              value={this.state.wsUrl} />
            <IconButton
              color={this.state.isConnect ? 'green' : 'red'}
              icon={this.state.isConnect ? 'lan-connect' : 'lan-disconnect'}
              size={35}
              onPress={() => this.state.isConnect ? this.closeWs() : this.initWs(this.state.wsUrl)}>
            </IconButton>
            <IconButton
              color={this.state.sendable ? 'green' : 'red'}
              icon={this.state.sendable ? 'send' : 'send-lock'}
              size={35}
              onPress={() => this.state.sendable ? this.setState({ sendable: false }) : this.setState({ sendable: true }, () => {
                this.shareImageZoom.current.moveTo({
                  type: "Self",
                  positionX: 0,
                  positionY: 0,
                  scale: 2.0,
                  zoomCurrentDistance: 0
                });
              })}>
            </IconButton>
          </View>
          <ShareImageZoom ref={this.shareImageZoom} onMove={(params: IOnMove) => this.handleOnMove(params)} />
        </View>
        <Snackbar
          visible={this.state.visible}
          onDismiss={() => this.setState({ visible: false })}
          action={{
            label: 'Close',
            onPress: () => {
              this.setState({ visible: false })
            },
          }}
        >
          {this.snackbarText}
        </Snackbar>
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolsbar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10
  }
});
