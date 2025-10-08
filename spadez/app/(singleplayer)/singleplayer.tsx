import { Text, View} from "react-native";
import CardTable from "@/components/CardTable";
import { StyleSheet } from "react-native";
import { maybeAddSuffix } from "react-native-reanimated/lib/typescript/common";

export default function SinglePlayer(){

    return(
    <View style = {styles.feltTable} >
          
            <CardTable />

    </View>


    
    )
    
}
const styles = StyleSheet.create({
    feltTable: {
    backgroundColor: "#0d4f0d",
    // width:"auto",
    // height:950,
    flex: 1,
  },
});