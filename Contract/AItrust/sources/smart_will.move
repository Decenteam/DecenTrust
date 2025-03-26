module smart_will::smart_will;

// === Imports ===
use sui::balance::{Self, Balance};
use sui::coin::{Self, Coin}; 
use sui::sui::SUI; 
use sui::clock::Clock;
use sui::object_bag::{Self, ObjectBag};
use sui::ed25519::ed25519_verify;

// === Constants ===
const ENotEnough: u64 = 1001;

// === Structs ===
public struct AdminCap has key {
    id: UID,
}

public struct Vault<phantom T> has key, store {
    id: UID,                     
    balance: Balance<T>,
    inheritants: vector<address>,    
    created_time: u64,
    public_key: vector<u8>,
}

public struct VaultManager has key, store {
    id: UID,
    vaults: ObjectBag,
}

// === Public Functions ===
fun init (ctx: &mut TxContext) {
    let manager = VaultManager {
        id: object::new(ctx),
        vaults: object_bag::new(ctx),
    };
    transfer::share_object(manager);
    transfer::transfer(AdminCap { id: object::new(ctx) }, ctx.sender());
}

// create a vault with an initial deposit
public entry fun create_vault(manager: &mut VaultManager, initial_deposit: Coin<SUI>, inheritants: vector<address>, clock: &Clock, public_key: vector<u8>, ctx: &mut TxContext) {

    let vault = Vault {
        id: object::new(ctx),
        balance: initial_deposit.into_balance(),
        inheritants: inheritants,
        created_time: clock.timestamp_ms(),
        public_key: public_key,
    };
    manager.vaults.add(public_key, vault);
    // transfer::public_transfer(vault,ctx.sender()); 
}

// deposit funds into the vault
public entry fun deposit(vault: &mut Vault, payment: Coin<SUI>) {
    coin::put(&mut vault.balance, payment);
}

// wtihdraw funds from the vault
public entry fun withdraw(vault: &mut Vault, amount: u64, ctx: &mut TxContext) {
    assert!(balance::value(&vault.balance) >= amount, ENotEnough);
    let withdrawl = coin::take(&mut vault.balance, amount, ctx);
    transfer::public_transfer(withdrawl, ctx.sender());
}
