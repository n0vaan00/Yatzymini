import React, { useState, useEffect } from "react";
import { Text, View, Pressable } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styles from '../style/style'

let board = [];
let dicenbr = [];

const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const NBR_OF_NBRS = 6;
const bonuspoints = 63;
let point = [0, 0, 0, 0, 0, 0];

export default function Gameboard() {
    
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');
    const [button, setButton] = useState('');
    const [disableButton, setDisableButton] = useState(false);
    const [disableDice, setDisableDice] = useState(false);
    const [disableNumber, setDisableNumbers] = useState(false);
    const [sum, setSum] = useState(0);
    const [selectedDices, setSelectedDices] = 
        useState(new Array (NBR_OF_DICES).fill(false));
    const [selectedNumber, setSelectedNumber] = 
        useState(new Array (NBR_OF_DICES).fill(false));
    const [total, setTotal] = useState(0);
    const [bonuspoint, setBonuspoint] = useState(63);
    const [bonus, setBonus] = useState('');

////DICES
    function getDiceColor(i) {
        return selectedDices[i] ? "grey" : "black";
    }

    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
        if(dices[i] === true) {
                let points = sum + dicenbr[i]
                setSum(points)
        } else if(dices[i] === false) {
            let points = sum - dicenbr[i]
            setSum(points)
        }
    }

    function throwDices() {
        setDisableDice(false)
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if(!selectedDices[i]){
            let randomNumber = Math.floor(Math.random() * 6 + 1);
            board[i] = 'dice-' + randomNumber;
            dicenbr[i] = randomNumber;
            }       
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
        } 
    }

    const row = [];
        for (let i = 0; i < NBR_OF_DICES; i++) {
            row.push(
                <Pressable
                key={"row" + i}
                disabled={disableDice}
                onPress={() => selectDice(i)}>
                    <MaterialCommunityIcons
                    name={board[i]}
                    key={"row" + i}
                    size={80}
                    color={getDiceColor(i)}>
                    </MaterialCommunityIcons>  
                </Pressable>
            );
        }

////NUMBERS

    function getNumberColor(i) {
        return selectedNumber[i] ? "grey" : "black";     
    }
    
    function selectNumber(i) {
        let counted = [...selectedNumber];
        counted[i] = selectedNumber[i] ? false : true;
        setSelectedNumber(counted);
        checkDices(i);
        setStatus('Throw dices again.')
        setSelectedDices(new Array (NBR_OF_DICES).fill(false));
        setNbrOfThrowsLeft(NBR_OF_THROWS)
       
        const count = point.reduce((a,b) => a + b)
        setTotal(count)
        let result = bonuspoints - count
        setBonuspoint(result)
        setDisableDice(true)
        setDisableButton(false)
    }

    const numbers = [];
    for (let i = 0; i < NBR_OF_NBRS; i++) {
        let y = i +1 
        numbers.push(  
            <Pressable
              key={"row" + i}
              disabled={disableNumber}
              onPress={() => selectNumber(i)}>
                <Text style={styles.points}>{point[i]}</Text>
                <MaterialCommunityIcons
                  name={"numeric-" + y + "-circle"}
                  key={"row" + i}
                  size={65}
                  color={getNumberColor(i)}>
                </MaterialCommunityIcons>  
            </Pressable>
        );
    }
    
    

    function checkDices(i) {
        if(nbrOfThrowsLeft === 0){
            let y = i + 1
            let result = 0

        if(dicenbr[0] === y) {
            point[i] += y
            result +=y
        }
        if(dicenbr[1] === y) {
            point[i] += y
            result +=y
        }
        if(dicenbr[2] === y) {
            point[i] += y
            result +=y
        }
        if(dicenbr[3] === y) {
            point[i] += y
            result +=y
        }
        if(dicenbr[4] === y) {
            point[i] += y
            result +=y
        }
        setSum(sum + result)
    }
    } 
    
    function checkWinner() {
        if (dicenbr.every((val, i, arr) => val == arr[0]) && nbrOfThrowsLeft >= 0 ) {
            setStatus('Yatzy, set points');
            setButton('Points please');        
            setDisableDice(true);
            checkDices();
            setDisableNumbers(false);
        }
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Start by throwing dices')   
        }
        else {
            setStatus('Select dices and throw again');
        }
    }

    useEffect(() => {
        checkWinner();
        
        if(nbrOfThrowsLeft === NBR_OF_THROWS) {
            setButton('Throw dices')
            setBonus('You are ' + bonuspoint + ' points away from bonus')
            setDisableNumbers(true)
        }
        if(bonuspoint < 0) {
            setBonus('You got the bonus');
        }
        if(nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS-1)
            setDisableNumbers(true)
        }
        if (nbrOfThrowsLeft === 0) {
            setStatus('No throws left,set points')
            setButton('Select points to continue');
            setDisableButton(true);
            checkDices();
            setDisableNumbers(false)
        }
        
        if(point.every (x => x)) {
            setStatus('You lost. Reset game')
            setDisableButton(true)
        }        
    }, [nbrOfThrowsLeft]);

    function reset () {
        board = []
        dicenbr = []
    
        point = [0, 0, 0, 0, 0, 0]
        setNbrOfThrowsLeft(NBR_OF_THROWS)
        setStatus('Start by throwing dices')
        setSelectedDices(new Array(NBR_OF_DICES).fill(false))
        setSelectedNumber(new Array(NBR_OF_NBRS).fill(false))
        setSum(0)
        setDisableNumbers(true)
        setDisableDice(false)
        setDisableButton(false)
        setBonuspoint(63)
        setNbrOfThrowsLeft(NBR_OF_THROWS)
        setTotal(0)
      }

    return(
        <View>
            <View style={styles.dices}>{row}</View>
            <View style={styles.info}>
                <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
                <Text style={styles.gamestatus}>{status}</Text>
                <Text style={styles.gameinfo}>Total points: {total}</Text>
            </View>
            <Pressable disabled={disableButton} style={styles.button} onPress={() => throwDices()}>
                    <Text style={styles.buttontext}>{button}</Text>
            </Pressable>
            <Text style={styles.gameinfo}>{bonus}</Text>
            <View style={styles.dices}>{numbers}</View>
            <Pressable style={styles.reset} onPress={() => reset()}>
                    <Text style={styles.buttontext}>Reset game</Text>
            </Pressable>
        </View>
    )
}