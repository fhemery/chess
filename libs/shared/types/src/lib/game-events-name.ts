export const enum GameEventName {
  AUTH = 'auth',
  AUTH_OK = 'auth:ok',
  GAME_SEARCH = 'game:search',
  GAME_SEARCH_KO = 'game:search:alreadyInGame',
  GAME_SEARCH_OK = 'game:search:ok',
  GAME_SEARCH_CANCEL = 'game:search:cancel',
  GAME_SEARCH_CANCELLED = 'game:search:cancelled',
  GAME_FOUND = 'game:found',
  GAME_STATUS = 'game:status',
  GAME_STATUS_UPDATE = 'game:status:update',
  GAME_STATUS_KO = 'game:status:ko',
  GAME_MOVE = 'game:move'
}
