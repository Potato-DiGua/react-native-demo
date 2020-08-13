import React, { Component } from "react";
import { FlatList, SafeAreaView, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import MovieItem, { MovieItemState } from "./MovieItem";

class AppState {
  data: MovieItemState[];
  isLoading: boolean;
  refreshing: boolean;
  constructor(data: MovieItemState[], refreshing: boolean = false, isLoading: boolean = false) {
    this.data = data;
    this.isLoading = isLoading;
    this.refreshing = refreshing;
  }
}
export default class App extends Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.state = new AppState([], false, true);
  }
  /**
   * 下拉刷新
   */
  private refresh(): void {
    if (this.state !== null && !this.state.refreshing) {
      this.setState(new AppState(this.state.data, true, false));
      this.getData();
    }
  }
  /**
   * 获取数据
   */
  private async getData() {
    try {
      let response = await fetch("http://api.tianapi.com/bulletin/index?key=1531150663469519b4bf4e6ba73a5e08");
      let result = await response.json();
      this.setState(new AppState(result.newslist));
    } catch (error) {
      console.error(error);
      this.setState(new AppState([]));
    }

  }

  /**
   * 绑定
   */
  componentDidMount() {
    this.getData();
  }
  /**
   * 渲染新闻
   * @param data 数据
   */
  renderItem(data: MovieItemState) {
    return (
      <MovieItem data={data} />
    );
  }
  /**
   * 渲染加载进度条
   */
  renderLoading() {
    return (
      <SafeAreaView style={styles.continer}>
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      </SafeAreaView >
    );
  }

  render() {
    if (this.state.isLoading) {
      return this.renderLoading();
    } else {
      return (
        <SafeAreaView style={styles.continer}>
          <FlatList
            data={this.state.data}
            renderItem={
              ({ item }) => this.renderItem(item)
            }
            keyExtractor={
              (item, index) => {
                return index.toString();
              }
            }
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => { this.refresh() }}
              />
            }
          />
        </SafeAreaView>
      );
    }

  }
}

const styles = StyleSheet.create({
  loading: {
    alignSelf: "center",
    flex: 1
  },
  continer: {
    flex: 1
  },
  title: {
    fontSize: 40,
    fontWeight: "bold"
  },
  img: {
    margin: 5
  }
});
