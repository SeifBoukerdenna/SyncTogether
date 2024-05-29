import { FlatList, StyleSheet, View } from "react-native"
import { Theme } from '@src/Theme/theme.d';
import { useTheme } from '@src/hooks/useTheme';
import { Text } from '@rneui/themed';
import SearchBarComponent from "src/Component/Timeline/SearchBar";
import CardEvent from '@src/Component/Timeline/CardEvent';
import bottomFooterComponent from "src/Component/Timeline/bottomTimelineComponent";

const Timeline = () => {
    const theme = useTheme();
    const styles = makeStyles(theme);


    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <SearchBarComponent onSearch={() => { }} />
            </View>
            <Text h2 h2Style={styles.textTimeline}>Timeline</Text>
            <FlatList
                data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]}
                renderItem={() => <CardEvent />}
                contentContainerStyle={{ gap: 30, marginTop: 10 }}
                ListFooterComponent={bottomFooterComponent}
                showsVerticalScrollIndicator={false}

            />
            <View style={styles.bottomView}>
                <Text h4>End of content</Text>
                <View>
                    <Text>Bottom Footer</Text>
                </View>
            </View>
        </View>
    )
}


const makeStyles = (theme: Theme) => StyleSheet.create({
    container: {
        gap: 20,
        width: '100%',
        padding: 10,
        borderWidth: 1,
        flex: 1,
        borderColor: 'gray',
    },
    searchBarContainer: {
        marginHorizontal: 10,
    },
    textTimeline: {
        color: theme.colors.white,
    },
    cardEventsContainer: {
        borderWidth: 3, borderColor: 'purple',
        gap: theme.spacings.xxl,
    },
    bottomView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    }
}
)

export default Timeline;