<?php

namespace phpMyFAQ\Instance;

/**
 * The phpMyFAQ instances basic database class.
 *
 * PHP Version 5.6
 *
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/
 *
 * @category  phpMyFAQ
 * @author    Thorsten Rinne <thorsten@phpmyfaq.de>
 * @copyright 2015-2018 phpMyFAQ Team
 * @license   http://www.mozilla.org/MPL/2.0/ Mozilla Public License Version 2.0
 * @link      http://www.phpmyfaq.de
 * @since     2015-02-14
 */

use phpMyFAQ\Configuration;
use phpMyFAQ\Exception;

if (!defined('IS_VALID_PHPMYFAQ')) {
    exit();
}

/**
 * PMF_Instance_Database.
 *
 * @category  phpMyFAQ
 * @author    Thorsten Rinne <thorsten@phpmyfaq.de>
 * @copyright 2015-2018 phpMyFAQ Team
 * @license   http://www.mozilla.org/MPL/2.0/ Mozilla Public License Version 2.0
 * @link      http://www.phpmyfaq.de
 * @since     2015-02-14
 */
class Database
{
    /**
     * Instance.
     *
     * @var Driver
     */
    private static $instance = null;

    /**
     * Database type.
     *
     * @var string
     */
    private static $dbType = null;

    /**
     * DROP TABLE statements.
     * 
     * @var array
     */
    private $dropTableStmts = [
        'DROP TABLE %sfaqadminlog',
        'DROP TABLE %sfaqattachment',
        'DROP TABLE %sfaqattachment_file',
        'DROP TABLE %sfaqcaptcha',
        'DROP TABLE %sfaqcategories',
        'DROP TABLE %sfaqcategoryrelations',
        'DROP TABLE %sfaqcategory_group',
        'DROP TABLE %sfaqcategory_user',
        'DROP TABLE %sfaqchanges',
        'DROP TABLE %sfaqcomments',
        'DROP TABLE %sfaqconfig',
        'DROP TABLE %sfaqdata',
        'DROP TABLE %sfaqdata_revisions',
        'DROP TABLE %sfaqdata_group',
        'DROP TABLE %sfaqdata_tags',
        'DROP TABLE %sfaqdata_user',
        'DROP TABLE %sfaqglossary',
        'DROP TABLE %sfaqgroup',
        'DROP TABLE %sfaqgroup_right',
        'DROP TABLE %sfaqinstances',
        'DROP TABLE %sfaqinstances_config',
        'DROP TABLE %sfaqnews',
        'DROP TABLE %sfaqquestions',
        'DROP TABLE %sfaqright',
        'DROP TABLE %sfaqsearches',
        'DROP TABLE %sfaqsessions',
        'DROP TABLE %sfaqstopwords',
        'DROP TABLE %sfaqtags',
        'DROP TABLE %sfaquser',
        'DROP TABLE %sfaquserdata',
        'DROP TABLE %sfaquserlogin',
        'DROP TABLE %sfaquser_group',
        'DROP TABLE %sfaquser_right',
        'DROP TABLE %sfaqvisits',
        'DROP TABLE %sfaqvoting',
    ];

    /**
     * @var PMF_Configuration
     */
    protected $config;

    /**
     * Constructor.
     *
     * @param Configuration $config
     */
    private function __construct(Configuration $config)
    {
        $this->config = $config;
    }

    /**
     * Database factory.
     *
     * @param Configuration $config phpMyFAQ configuration container
     * @param string            $type   Database management system type
     *
     * @throws Exception
     *
     * @return Database
     */
    public static function factory(Configuration $config, $type)
    {
        self::$dbType = $type;

        $class = '\phpMyFAQ\Instance\Database\\'.ucfirst($type);

        if (class_exists($class)) {
            self::$instance = new $class($config);

            return self::$instance;
        } else {
            throw new Exception('Invalid Database Type: '.$type);
        }
    }

    /**
     * Returns the single instance.
     *
     * @return Driver
     */
    public static function getInstance()
    {
        if (null === self::$instance) {
            $className = __CLASS__;
            self::$instance = new $className();
        }

        return self::$instance;
    }

    /**
     * __clone() Magic method to prevent cloning.
     */
    private function __clone()
    {
    }

    /**
     * Executes all DROP TABLE statements.
     *
     * @param string $prefix
     *
     * @return bool
     */
    public function dropTables($prefix = '')
    {
        foreach ($this->dropTableStmts as $stmt) {
            $result = $this->config->getDb()->query(sprintf($stmt, $prefix));

            if (!$result) {
                return false;
            }
        }

        return true;
    }
}
