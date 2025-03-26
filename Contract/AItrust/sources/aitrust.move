// module aitrust::aitrust {
    
//     public struct AIadmincap has key, store{
//         id: UID
//     }
    
//     public struct AITRUST has drop{}

//     fun init(otw: AITRUST, ctx: &mut TxContext) {
//         let admincap = AIadmincap {
//             id: object::new(ctx)
//         };
//         transfer::public_transfer(admincap, ctx.sender());
//     }
// }