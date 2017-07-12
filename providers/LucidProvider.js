'use strict'

/*
 * adonis-lucid
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const { ServiceProvider } = require('@adonisjs/fold')

class LucidProvider extends ServiceProvider {
  /**
   * Registering the database manager under
   * Adonis/Src/Database namespace.
   *
   * @method _registerDatabase
   *
   * @return {void}
   *
   * @private
   */
  _registerDatabase () {
    this.app.singleton('Adonis/Src/Database', (app) => {
      const Config = app.use('Adonis/Src/Config')
      const Database = require('../src/Database/Manager')
      return new Database(Config)
    })
    this.app.alias('Adonis/Src/Database', 'Database')
  }

  /**
   * Registering the lucid model under
   * Adonis/Src/Model namespace.
   *
   * @method _registerModel
   *
   * @return {void}
   *
   * @private
   */
  _registerModel () {
    this.app.bind('Adonis/Src/Model', (app) => require('../src/Lucid/Model'))
    this.app.alias('Adonis/Src/Model', 'Model')
  }

  /**
   * Register all the required providers
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    this._registerDatabase()
    this._registerModel()
  }
}

module.exports = LucidProvider