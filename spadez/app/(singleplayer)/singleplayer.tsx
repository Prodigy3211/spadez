import { Text, View} from "react-native";
import CardTable from "@/components/CardTable";
import { StyleSheet } from "react-native";
import { maybeAddSuffix } from "react-native-reanimated/lib/typescript/common";

export default function SinglePlayer(){

    return(
    <View style = {styles.feltTable} >
        <Text>
            Hello
            <CardTable></CardTable>
        </Text>

    </View>


    
    )
    
}
const styles = StyleSheet.create({
    feltTable: {
    backgroundColor: "green",
    width:"auto",
    height:950,
  },
});