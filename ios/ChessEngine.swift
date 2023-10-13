//
//  Engine.swift
//  ChessTrainerPro
//
//  Created by Navin Chikkodi on 10/2/23.
//

import Foundation
import ChessKitEngine

@objc(ChessEngine)
class ChessEngine: RCTEventEmitter {
  private var engine = Engine(type: .stockfish)
  private var bestMove = ""
  
  override init() {
    super.init()
    engine.receiveResponse = { response in
      print(response)
    }
    engine.start()
  }
  
  @objc
  func getEngineMove(currFen: String) {
    guard engine.isRunning else { return }
    engine.send(command: .stop)
    engine.send(command: .position(.fen(currFen)))
    engine.send(command: .go(depth: 15))
    
    engine.receiveResponse = { [self] response in
      switch response {
      case let .info(info):
        print(info.score ?? 0)
        print(info.pv![0])
        bestMove = info.pv![0]
        sendEvent(withName: "bestMove", body: ["bestMove", bestMove])
      default:
        break
      }
    }
  }
  
  @objc
  func getTestMove(_ currFen:String,
                   _ resolve:RCTPromiseResolveBlock,
                   reject:RCTPromiseRejectBlock
                   ) {
    guard engine.isRunning else { return }
    engine.send(command: .stop)
    engine.send(command: .position(.fen("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")))
    sendEvent(withName: "bestMove", body: ["count decrease", bestMove])
  }
  
  
  @objc
  func stop() {
    engine.stop()
  }
  
  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  override func supportedEvents() -> [String]! {
    return ["bestMove"]
  }
}

/*
@objc(Engine)
class Engine: RCTEventEmitter {
  private var count = 0
  
  @objc
  func increment(_ callback:RCTResponseSenderBlock) {
    count += 1
    callback([count])
    sendEvent(withName: "onIncrement", body: ["count increase", count])
  }
  
  @objc
  override static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  @objc
  override func constantsToExport() -> [AnyHashable: Any]! {
    return ["initialCount": 0]
  }
  
  override func supportedEvents() -> [String]! {
    return ["onIncrement", "onDecrement"]
  }
  
  @objc
  func decrement(_ resolve:RCTPromiseResolveBlock,
                 reject:RCTPromiseRejectBlock) {
    if (count == 0) {
      let error = NSError(domain: "", code: 200, userInfo: nil)
      reject("ERROR_COUNT", "Count cannot be negative", error)
    } else {
      count -= 1
      resolve("Count is \(count)")
      sendEvent(withName: "onDecrement", body: ["count decrease", count])
    }
  }
}*/
