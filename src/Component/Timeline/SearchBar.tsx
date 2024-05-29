import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Input, Button, SearchBar } from '@rneui/themed';
import { Theme } from '@src/Theme/theme.d';
import { useTheme } from '@src/hooks/useTheme';



interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBarComponent: React.FC<SearchBarProps> = ({ onSearch }) => {
    const theme = useTheme();
    const styles = makeStyles(theme);
    const [search, setSearch] = useState("");


    return (
        <SearchBar inputContainerStyle={styles.inputContainer} containerStyle={styles.searchBarContainer} placeholder="Search..." round onChangeText={setSearch} value={search} />
    );
};


const makeStyles = (theme: Theme) => StyleSheet.create({
    searchBarContainer: {
        backgroundColor: theme.colors.grey,
        borderRadius: 25,
    },
    inputContainer: {
        backgroundColor: theme.colors.black,
        borderColor: theme.colors.white,
        borderWidth: 1,
        borderBottomColor: theme.colors.white,
        borderBottomWidth: 1
    }

});


export default SearchBarComponent;