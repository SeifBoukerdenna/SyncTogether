import { Theme } from "@src/Theme/theme.d";
import { useTheme } from "@src/hooks/useTheme";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";



// Set locale configuration (optional)
LocaleConfig.locales['en'] = {
    monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ],
    monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ],
    dayNames: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    today: "Today"
};
LocaleConfig.defaultLocale = 'en';


type CalendarComponentProps = {
    markedDates: MarkedDates | undefined
}

const CalendarComponent = ({ markedDates }: CalendarComponentProps) => {
    const theme = useTheme();
    const styles = makeStyles(theme);

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <Calendar
                    markedDates={markedDates}
                    current={new Date().toISOString().split('T')[0]}
                    onDayPress={(day) => {
                        console.log('selected day', day);
                    }}
                    monthFormat={'MMMM yyyy'}
                    hideExtraDays={true}
                    disableMonthChange={true}

                    onPressArrowLeft={(subtractMonth) => subtractMonth()}
                    onPressArrowRight={(addMonth) => addMonth()}

                    theme={{
                        calendarBackground: theme.colors.black,
                        textSectionTitleColor: 'white',
                        selectedDayBackgroundColor: theme.colors.primary,
                        todayTextColor: 'white',
                        todayBackgroundColor: theme.colors.primary,
                        dayTextColor: '#ffffff',
                        textDisabledColor: '#d9e1e8',
                        dotColor: theme.colors.primary,
                        selectedDotColor: '#ffffff',
                        arrowColor: 'white',
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: 'white',
                        indicatorColor: theme.colors.primary,
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',

                    }}
                    style={styles.calendar}
                />
            </SafeAreaView>
        </View>
    );
}


const makeStyles = (theme: Theme) => StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: theme.colors.onBackground,
    },
    calendar: {
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: theme.colors.black,
        borderWidth: 1,
        borderColor: 'gray',
        height: 350
    },
})

export default CalendarComponent