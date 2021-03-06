import mysql, { Connection, RowDataPacket } from 'mysql2/promise'
import { DB_CONFIG } from './config'

const getConnection = async () => {
    const connection: Connection = await mysql.createConnection(DB_CONFIG)
    return connection
}

export const getTopPlayers = async () => {
    const connection: Connection = await getConnection()
    const query = 'SELECT p.nickname, p.profile_image, SUM(s.score) as totalScore'
    + ' FROM player p JOIN stat s ON (s.player_id = p.id)'
    + ' GROUP BY p.nickname, p.profile_image ORDER BY SUM(s.score) DESC LIMIT 10;'
    const [rows] = await connection.query<RowDataPacket[]>(query)! 
    const topPlayers = rows.map(r => { return {
        nickname: r.nickname,
        profileImage: r.profile_image,
        totalScore: r.totalScore
    }})
    connection.end()
    const lastUpdate = await getLastUpdate()
    return {
        lastUpdate,
        topPlayers
    }
}

const getLastUpdate = async () => {
    const connection: Connection = await getConnection()
    const query = 'SELECT created_at from STAT order by created_at desc limit 1;'
    const [rows] = await connection.query<RowDataPacket[]>(query)! 
    const lastUpdate = rows[0].created_at
    connection.end()
    return lastUpdate
}


const generateRandomScore = () => {
    return (Math.random()*100).toFixed(2)
}

const insertStat = async (playerId: number) => {
    const query = `INSERT INTO STAT (player_id, score) VALUES('${playerId}', ${generateRandomScore()})`
    const connection = await getConnection()
    await connection.execute(query)
    connection.end()
}

const insertPlayer = async (nickname: string, profileImage: string) => {
    const query = `INSERT IGNORE INTO PLAYER (nickname, profile_image) VALUES('${nickname}', '${profileImage}')`
    const connection = await getConnection()
    await connection.execute(query, [nickname, profileImage])
    connection.end()
}

const getPlayerId = async (nickname: string) => {
    const connection: Connection = await getConnection()
    const query = `SELECT p.id FROM player p WHERE p.nickname = '${nickname}'`
    const [rows] = await connection.query<RowDataPacket[]>(query, [nickname])
    const id = rows[0].id
    connection.end()
    return id
}

export const insertPlayerStat = async (nickname: string, profileImage: string) => {
    await insertPlayer(nickname, profileImage)
    const id =await getPlayerId(nickname)
    await insertStat(id)
}