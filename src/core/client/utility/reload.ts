import * as alt from 'alt-client';
import * as native from 'natives';
import { SystemEvent } from '../../shared/utility/enums';

alt.onServer(SystemEvent.Player_Reload, playerReload);

function playerReload() {
    let attempts = 0;
    let interval = alt.setInterval(() => {
        const [_unk, _hash] = native.getCurrentPedWeapon(alt.Player.local.scriptID, undefined, undefined);
        if (attempts >= 4) {
            alt.clearInterval(interval);
            native.setAmmoInClip(alt.Player.local.scriptID, _hash, 9999);
            return;
        }
        if (native.isPedReloading(alt.Player.local.scriptID)) {
            alt.clearInterval(interval);
            native.setAmmoInClip(alt.Player.local.scriptID, _hash, 9999);
            return;
        } else {
            native.setAmmoInClip(alt.Player.local.scriptID, _hash, 1);
            native.makePedReload(alt.Player.local.scriptID);
            attempts += 1;
        }
    }, 100);
}
