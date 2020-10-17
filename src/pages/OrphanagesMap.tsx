import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import mapMarker from '../images/map-marker.png'
import api from '../services/api'

interface Orphanage {
    name: string
    latitude: number
    longitude: number
    id: number
}

export default function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    const navigation = useNavigation()

    function navigateToDetails(id: number) {
        navigation.navigate('OrphanageDetails', { id })
    }

    function createOrphanage() {
        navigation.navigate('SelectMapPosition')
    }

    useFocusEffect(() => {
        api.get('orphanages').then(({ data }) => {
            setOrphanages(data)
        })
    })

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -23.1517861,
                    longitude: -46.9636147,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}
            >
                {orphanages.map(({ latitude, longitude, name, id }) => (
                    <Marker
                        key={id}
                        icon={mapMarker}
                        calloutAnchor={{
                            x: 2.7,
                            y: 0.8,
                        }}
                        coordinate={{
                            latitude,
                            longitude,
                        }}
                    >
                        <Callout tooltip onPress={() => navigateToDetails(id)}>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}>{name}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    {orphanages.length > 1
                        ? `${orphanages.length} orfanatos encontrados`
                        : `${orphanages.length} orfanato encontrado`}
                </Text>

                <RectButton
                    style={styles.createOrphanageButton}
                    onPress={createOrphanage}
                >
                    <Feather name="plus" size={20} color="#fff" />
                </RectButton>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height + 100,
    },
    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 16,
        justifyContent: 'center',
        elevation: 3,
    },
    calloutText: {
        fontFamily: 'bold',
        color: '#0089a5',
        fontSize: 14,
    },
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,
        backgroundColor: '#fff',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
    },
    footerText: {
        color: '#8fa7b3',
        fontFamily: 'bold',
    },
    createOrphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15c3b6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
