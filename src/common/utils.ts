export function channelRoom(channelId: number) {
    return `channel:${channelId}`;
}

export function userRoom(userId: number) {
    return `user:${userId}`;
}

export function sessionRoom(sessionId: number) {
    return `session:${sessionId}`;
}

export function userStateRoom(userId: number) {
    return `user_state:${userId}`;
}
