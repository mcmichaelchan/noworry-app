import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, TextInput, TouchableHighlight, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StackNavigator, TabNavigator } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { modify } from '../../../actions/userActions'

import Carousel from 'react-native-snap-carousel'

import FileCell from './fileCell'
import InputBox from './inputBox'

const WIDTH = 0
const { height, width } = Dimensions.get('window');

import { addFamilyName, addFirstName, addID } from '../../../actions/appointActions'


class appointment extends Component {
    constructor() {
        super()
        this.state = {
            index: [1,0,0,0,0],
            data: [{ name: '1' }, { name: '2', }, { name: '3' }, { name: '4' }, { name: '5' }],
            title: ['这是您要准备的资料', '现在，请填写您的信息', '我们为您推荐如下受理单位', '现在，请选择您的办理时间', '最后，请确认一下您的所有信息'],
        }
    }

    _setValue(type, value) {
        console.log('wtf')
        switch(type) {
            case 'familyName': {
                this.props.addFamilyName(value)
                break
            }
            case 'firstName': {
                this.props.addFirstName(value)
                break
            }
            case 'id': {
                this.props.addID(value)
                break
            }
        }
    }

    _renderItem({ item, index }) {
        
        switch (index)  
        {
            case 0: {
                return (
                    <View style={styles.filesContainer}>
                        <FileCell title='基础资料' item={['身份证原件及复印件', '户口本原件及复印件']} />
                        <FileCell title='专用资料' item={['学生证原件及复印件', '在校证明原件及复印件']} />
                        <FileCell title='图像资料' item={['大一寸照*1', '居住证相片回执']} />
                        <FileCell title='办理费用' item={['居住证工本费 200元']} />
                    </View>
                )
            }  
            
            case 1: {
                return (
                    <ScrollView style={styles.inputPageContainer}>
                        <View style={styles.inputSection}>
                            <Text style={{ color: '#CCCCCC', marginLeft:4, marginBottom: 6}}>姓名</Text>
                            <View style={{flexDirection:'row'}}>
                                <InputBox placeholder='姓' width={74} setValue={(a,b) => this._setValue(a,b)} value={this.props.info.familyName}/>
                                <InputBox placeholder='名' width={138} setValue={(a, b) => this._setValue(a, b)} value={this.props.info.firstName} />
                            </View>
                        </View>
                        <View style={styles.inputSection}>
                            <Text style={{ color: '#CCCCCC', marginLeft: 4, marginBottom: 6 }}>身份证号</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    placeholder='身份证号'
                                    style={[styles.inputbox, { width: 221 }]}
                                />
                            </View>
                        </View>
                        <View style={styles.inputSection}>
                            <Text style={{ color: '#CCCCCC', marginLeft: 4, marginBottom: 6 }}>联系电话</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    placeholder='联系电话'
                                    style={[styles.inputbox, { width: 221 }]}
                                />
                            </View>
                        </View>
                        <View style={styles.inputSection}>
                            <Text style={{ color: '#CCCCCC', marginLeft: 4, marginBottom: 6 }}>家庭住址</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    placeholder='家庭住址'
                                    multiline={true}
                                    autoGrow={true}
                                    style={[styles.inputbox, { width: 221 }]}
                                />
                            </View>
                        </View>
                        <View style={styles.inputSection}>
                            <Text style={{ color: '#CCCCCC', marginLeft: 4, marginBottom: 6 }}>姓名</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    placeholder='姓'
                                    style={[styles.inputbox, { width: 74 }]}
                                />
                                <TextInput
                                    placeholder='名'
                                    style={[styles.inputbox, { width: 138 }]}
                                />
                            </View>
                        </View>
                    </ScrollView>
                )
            }

            default: {
                return (
                    <View style={styles.slide}>
                        <Text style={styles.title}>{item.name}</Text>
                    </View>
                )
            }
        
        } 
    }

    _renderLowerIndicator(index) {
        for (let i=1; i <= 5; i++) {
            if (index == i) {
                return(
                    <View style={styles.colorDot} />
                )
            } else {
                return (
                    <View style={styles.noColorDot} />
                )
            }
        }
    }

    _setIndex(slideIndex) {
        let newIndex = []
        for (let i = 0; i < 5; i++) {
            if (i == slideIndex) {
                newIndex[i] = 1
            } else {
                newIndex[i] = 0
            }
        }
        this.setState({
            index: newIndex,
        })
    }

    render() {
        const { title } = this.state
        console.log(this.props)
        return (
            <View style={styles.container}>
                <View style={styles.upperIndicatorContainer}>
                    {this.state.index.map((item, index) => {
                        if (item == 1) {
                            return (
                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{title[index]}</Text>
                            )
                        }
                    })}
                </View>
                 <View style={styles.carouselContainer}>
                    <Carousel
                        slideStyle={styles.item}
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.data}
                        renderItem={this._renderItem.bind(this)}
                        sliderWidth={width}
                        itemWidth={width - 80}
                        inactiveSlideScale={0.85}
                        onScroll={() => {
                            console.log('slideIndex')
                        }}
                        onSnapToItem={(slideIndex) => this._setIndex(slideIndex)}
                    />
                </View>  
                <View style={styles.upperIndicatorContainer}>
                    {this.state.index.map((item, index) => {
                        if (item == 1) {
                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View key={index} style={styles.colorCircle}>
                                        <Text style={{ color: 'white' }}>{index + 1}</Text>
                                    </View>
                                </View>

                            )
                        } else {
                            return (
                                <View key={index} style={styles.noColorCircle}>
                                    <Text style={{ color: '#8C8C8C' }}>{index + 1}</Text>
                                </View>
                            )
                        }
                    })}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'red',
        borderWidth: WIDTH,
        flex: 1,
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        borderColor: 'red',
        borderWidth: WIDTH,
    },
    item: {
        width: width - 80,
        height: 464,
        borderColor: 'green',
        borderWidth: WIDTH,
        shadowColor: 'grey',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        // elevation: 1,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    carouselContainer: {
        height: 484,
        borderColor: 'green',
        borderWidth: 0,
        marginBottom: 10,
        marginTop: 15,
    },
    colorDot: { 
        height: 10, 
        width: 10, 
        borderRadius: 5, 
        borderColor: '#949494', 
        borderWidth: 0.5,
        backgroundColor: '#4380FC'
    },
    noColorDot: { 
        height: 10, 
        width: 10, 
        borderRadius: 5, 
        borderWidth: 0.5,
        borderColor: '#949494', 
    },
    lowerIndicatorContainer: {
        height: 15,
        width: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'green',
        borderWidth: WIDTH,
        justifyContent: 'space-between',  
    },
    upperIndicatorContainer: {
        borderColor: 'green',
        borderWidth: WIDTH,
        flexDirection: 'row',
        alignItems: 'center',
    },
    colorCircle: {
        height: 25,
        width: 25,
        borderRadius: 16,
        borderColor: '#e9e9e9',
        borderWidth: 1.5,
        backgroundColor: '#4380FC',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    noColorCircle: {
        height: 25,
        width: 25,
        borderRadius: 12.5,
        borderWidth: 1.5,
        borderColor: '#e9e9e9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filesContainer: {
        flex: 1,
        borderColor: 'orange',
        borderWidth: WIDTH,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingTop: 30,
       
    },
    inputPageContainer: {
        flex: 1,
        borderColor: 'orange',
        borderWidth: WIDTH,
        paddingTop: 30,
        paddingLeft: 40,
    },
    inputbox: {
        height:52,
        fontSize: 16,
        borderColor: '#bbbbbb',
        borderWidth: 2,
        color: '#6a9ae3',
        textAlign: 'center',
        borderRadius: 6,
        marginRight: 10,
    },
    inputSection: {
        marginBottom: 16,
    }

})


function mapStateToProps(state) {
    return {
        info: state.appoint,
    };
}

function mapDispatchProps(dispatch) {
    return {
        addFamilyName: bindActionCreators(addFamilyName, dispatch),
        addFirstName: bindActionCreators(addFirstName, dispatch),
        addID: bindActionCreators(addID, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchProps
)(appointment)